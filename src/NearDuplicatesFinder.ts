import {EventEmitter} from 'events';

import FilterInterface from "./Filter/FilterInterface";
import ShinglingTool from "./ShinglingTool/ShinglingTool";
import SparseMatrix from "./ShinglingTool/SparseMatrix";
import StringShinglingTool from "./ShinglingTool/StringShinglingTool";
import {getCompactHasher} from "./Factory/hasherFactory";
import WordShinglingTool from "./ShinglingTool/WordShinglingTool";
import {baseFilterFactory} from "./Factory/filterFactory";
import SignatureMatrix from "./ShinglingTool/SignatureMatrix";
import HashRegister from "./Util/HashRegister";

export type Bucket = {[hash: string]: string[]};
export type Config = {rowsPerBand: number, minSimilarity: number};

export default class NearDuplicatesFinder extends EventEmitter{
    protected shinglesMatrix: SparseMatrix;
    protected signatureMatrix: SignatureMatrix;

    protected filter?: FilterInterface;
    protected shinglingTool: ShinglingTool;
    protected candidates: string[][] = [];
    protected duplicates: {[id: string]: [number, string][]} = {};


    protected config: Config;
    protected hashRegister: HashRegister = new HashRegister("md5");

    protected errors: any[] = [];

    public constructor(
        config: Config,
        shinglesMatrix: SparseMatrix,
        signatureMatrix: SignatureMatrix,
        shinglingTool: ShinglingTool,
        filter?: FilterInterface) {
        super();
        this.config = config;

        this.shinglesMatrix = shinglesMatrix;
        this.signatureMatrix = signatureMatrix;
        this.shinglingTool = shinglingTool;
        this.filter = filter;
    }

    public add = async (docId: string, text: string): Promise<void> => {
        text = this.filter ? this.filter.filter(text) : text;
        await this.shinglingTool.process(docId, text, (docId:string, shingle) => {
            this.shinglesMatrix.addItem(shingle, docId);
        });

        this.emit('doc_added', docId);
    }

    public async start() {

        this.emit('start');

        this.signatureMatrix.fromSparseMatrix(this.shinglesMatrix);

        const rows = this.signatureMatrix.getSignatureRows();
        const rowsPerBand = this.config.rowsPerBand;
        let currentVectors: { [id: string]: number[] }[] = [];
        let counter = 0;
        let bandKey = 0;

        let docIds: string[] = [];

        for (const row of rows) {
            counter += 1;

            if (!docIds.length) {
                docIds = Object.keys(row);
            }

            for (const docId of docIds) {
                const vectorPoint: number = Object.entries(row[docId])[0][1];

                if (!currentVectors[bandKey]) {
                    currentVectors[bandKey] = {};
                }

                if (!currentVectors[bandKey][docId]) {
                    currentVectors[bandKey][docId] = [];
                }

                currentVectors[bandKey][docId].push(vectorPoint);

            }

            if (counter < this.signatureMatrix.getSignatureLength() && counter % rowsPerBand != 0) {
                continue;
            }


          await this.findCandidates([...docIds], currentVectors[bandKey])
                .then(bucket => this.compress(bucket))
                .catch(err => {
                this.emit('error', err);
                this.errors.push(err)
            });

            bandKey += 1;
        }


        await this.findDuplicates(this.candidates);
        console.log(this.duplicates);

        this.emit('finish')
    }


    async findCandidates(docIds: string[], vectors: {[id: string]: number[]}): Promise<Bucket> {
        let bucket: Bucket = {}
        for (const doc of docIds) {
            const hash = vectors[doc].reduce((a, b) => a + b);
            console.log(hash);
            if (!bucket[hash]) {
                bucket[hash] = [];
            }
            bucket[hash].push(doc);
        }

        return bucket;
    }

    async findDuplicates(candidates: string[][]) {
        let docIds: string[] = [];

        candidates.forEach(item => {
            docIds = docIds.concat(item);
        })

        const docsShingles = this.shinglesMatrix.getDocShingles(docIds);

        for (const pair of candidates) {
            this.compare(pair, docsShingles);
        }
    }

    public compress(bucket: Bucket): void {
        for (const hash in bucket) {
            if (bucket[hash].length > 1 && !this.hashRegister.check(bucket[hash].join(''))) {
                this.candidates.push(bucket[hash]);
            }
        }
    }

    async compare(docIds: string[], shingles: {[docId: string]: (string|number)[]}) {

           for (const current of docIds) {
               docIds.shift();

               const currentShingles = shingles[current];

               for (const doc of docIds) {

                   if (current === doc) {
                       continue;
                   }

                   const jaccard = this.compareShingles(currentShingles, shingles[doc])

                   if (jaccard >= this.config.minSimilarity) {
                       if (typeof this.duplicates[current] === 'undefined') {
                           this.duplicates[current] = [];
                       }
                       this.duplicates[current].push([jaccard, doc]);
                       this.emit('found_duplicates', [current, doc]);
                   }
               }
           }
       }

    protected compareVectors(a: number[], b: number[]): boolean {
        return a.join('') === b.join('');
    }

    protected compareShingles(s1: (string|number)[], s2: (string|number)[]): number {

        let similar: (number|string)[] = [];
        let total: (number|string)[] = [];


        for (const shingle of s1) {
            s2.includes(shingle) ? similar.push(shingle) : total.push(shingle);
        }

        for (const shingle of s2) {
            !total.includes(shingle) && total.push(shingle);
        }

        return total.length > 0 ? similar.length/total.length : 0;
    }

    public hasErrors(): boolean {
        return this.errors.length > 0;
    }

    public getErrors(): any[] {
        return this.errors;
    }
}


export const makeFinder = (config: {minSimilarity: number, shinglesSize: number, shinglesType: 'char'|'word', signatureLength: number, rowsPerBand: number}) => {
    let shingleTool: ShinglingTool;
    if (config.shinglesType === 'char') {
        shingleTool = new StringShinglingTool(config.shinglesSize, getCompactHasher());
    }  else {
        shingleTool = new WordShinglingTool(config.shinglesSize, getCompactHasher());
    }

    return new NearDuplicatesFinder(
        {rowsPerBand: config.rowsPerBand, minSimilarity: config.minSimilarity},
        new SparseMatrix(),
        new SignatureMatrix(config.signatureLength),
        shingleTool,
        baseFilterFactory(),
    );
}

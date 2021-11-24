"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFinder = void 0;
const events_1 = require("events");
const SparseMatrix_1 = __importDefault(require("./ShinglingTool/SparseMatrix"));
const StringShinglingTool_1 = __importDefault(require("./ShinglingTool/StringShinglingTool"));
const hasherFactory_1 = require("./Factory/hasherFactory");
const WordShinglingTool_1 = __importDefault(require("./ShinglingTool/WordShinglingTool"));
const filterFactory_1 = require("./Factory/filterFactory");
const SignatureMatrix_1 = __importDefault(require("./ShinglingTool/SignatureMatrix"));
const HashRegister_1 = __importDefault(require("./Util/HashRegister"));
class NearDuplicatesFinder extends events_1.EventEmitter {
    constructor(config, shinglesMatrix, signatureMatrix, shinglingTool, filter) {
        super();
        this.candidates = [];
        this.duplicates = {};
        this.hashRegister = new HashRegister_1.default("md5");
        this.errors = [];
        this.add = (docId, text) => __awaiter(this, void 0, void 0, function* () {
            text = this.filter ? this.filter.filter(text) : text;
            yield this.shinglingTool.process(docId, text, (docId, shingle) => {
                this.shinglesMatrix.addItem(shingle, docId);
            });
            this.emit('doc_added', docId);
        });
        this.config = config;
        this.shinglesMatrix = shinglesMatrix;
        this.signatureMatrix = signatureMatrix;
        this.shinglingTool = shinglingTool;
        this.filter = filter;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.emit('start');
            this.signatureMatrix.fromSparseMatrix(this.shinglesMatrix);
            const rows = this.signatureMatrix.getSignatureRows();
            const rowsPerBand = this.config.rowsPerBand;
            let currentVectors = [];
            let counter = 0;
            let bandKey = 0;
            let docIds = [];
            for (const row of rows) {
                counter += 1;
                if (!docIds.length) {
                    docIds = Object.keys(row);
                }
                for (const docId of docIds) {
                    const vectorPoint = Object.entries(row[docId])[0][1];
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
                yield this.findCandidates([...docIds], currentVectors[bandKey])
                    .then(bucket => this.compress(bucket))
                    .catch(err => {
                    this.emit('error', err);
                    this.errors.push(err);
                });
                bandKey += 1;
            }
            yield this.findDuplicates(this.candidates);
            console.log(this.duplicates);
            this.emit('finish');
        });
    }
    findCandidates(docIds, vectors) {
        return __awaiter(this, void 0, void 0, function* () {
            let bucket = {};
            for (const doc of docIds) {
                const hash = vectors[doc].reduce((a, b) => a + b);
                console.log(hash);
                if (!bucket[hash]) {
                    bucket[hash] = [];
                }
                bucket[hash].push(doc);
            }
            return bucket;
        });
    }
    findDuplicates(candidates) {
        return __awaiter(this, void 0, void 0, function* () {
            let docIds = [];
            candidates.forEach(item => {
                docIds = docIds.concat(item);
            });
            const docsShingles = this.shinglesMatrix.getDocShingles(docIds);
            for (const pair of candidates) {
                this.compare(pair, docsShingles);
            }
        });
    }
    compress(bucket) {
        for (const hash in bucket) {
            if (bucket[hash].length > 1 && !this.hashRegister.check(bucket[hash].join(''))) {
                this.candidates.push(bucket[hash]);
            }
        }
    }
    compare(docIds, shingles) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const current of docIds) {
                docIds.shift();
                const currentShingles = shingles[current];
                for (const doc of docIds) {
                    if (current === doc) {
                        continue;
                    }
                    const jaccard = this.compareShingles(currentShingles, shingles[doc]);
                    if (jaccard >= this.config.minSimilarity) {
                        if (typeof this.duplicates[current] === 'undefined') {
                            this.duplicates[current] = [];
                        }
                        this.duplicates[current].push([jaccard, doc]);
                        this.emit('found_duplicates', [current, doc]);
                    }
                }
            }
        });
    }
    compareVectors(a, b) {
        return a.join('') === b.join('');
    }
    compareShingles(s1, s2) {
        let similar = [];
        let total = [];
        for (const shingle of s1) {
            s2.includes(shingle) ? similar.push(shingle) : total.push(shingle);
        }
        for (const shingle of s2) {
            !total.includes(shingle) && total.push(shingle);
        }
        return total.length > 0 ? similar.length / total.length : 0;
    }
    hasErrors() {
        return this.errors.length > 0;
    }
    getErrors() {
        return this.errors;
    }
}
exports.default = NearDuplicatesFinder;
const makeFinder = (config) => {
    let shingleTool;
    if (config.shinglesType === 'char') {
        shingleTool = new StringShinglingTool_1.default(config.shinglesSize, (0, hasherFactory_1.getCompactHasher)());
    }
    else {
        shingleTool = new WordShinglingTool_1.default(config.shinglesSize, (0, hasherFactory_1.getCompactHasher)());
    }
    return new NearDuplicatesFinder({ rowsPerBand: config.rowsPerBand, minSimilarity: config.minSimilarity }, new SparseMatrix_1.default(), new SignatureMatrix_1.default(config.signatureLength), shingleTool, (0, filterFactory_1.baseFilterFactory)());
};
exports.makeFinder = makeFinder;
//# sourceMappingURL=NearDuplicatesFinder.js.map
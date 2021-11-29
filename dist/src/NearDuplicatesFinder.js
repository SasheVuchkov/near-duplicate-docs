"use strict";
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
const SaltGenerator_1 = __importDefault(require("./Util/SaltGenerator"));
class NearDuplicatesFinder extends events_1.EventEmitter {
    constructor(config, shinglesMatrix, signatureMatrix, shinglingTool, filter) {
        super();
        this.candidates = [];
        this.duplicates = {};
        this.hashRegister = new HashRegister_1.default("md5");
        this.errors = [];
        this.add = (docId, text) => {
            text = this.filter ? this.filter.filter(text) : text;
            this.shinglingTool.process(docId, text, (docId, shingle) => {
                this.shinglesMatrix.addItem(shingle.toString(), docId);
            });
            this.emit("doc_added", docId);
        };
        this.config = config;
        this.shinglesMatrix = shinglesMatrix;
        this.signatureMatrix = signatureMatrix;
        this.shinglingTool = shinglingTool;
        this.filter = filter;
    }
    start() {
        this.emit("start");
        this.signatureMatrix.fromSparseMatrix(this.shinglesMatrix);
        const rows = this.signatureMatrix.getSignatureRows();
        const rowsPerBand = this.config.rowsPerBand;
        const currentVectors = [];
        let counter = 0;
        let bandKey = 0;
        let docIds = [];
        for (const row of rows) {
            counter += 1;
            return;
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
            if (counter < this.signatureMatrix.getSignatureLength() &&
                counter % rowsPerBand != 0) {
                continue;
            }
            const bucket = this.findCandidates([...docIds], currentVectors[bandKey]);
            this.compress(bucket);
            bandKey += 1;
        }
        this.findDuplicates(this.candidates);
        console.log(this.duplicates);
        this.emit("finish");
    }
    findCandidates(docIds, vectors) {
        const bucket = {};
        for (const doc of docIds) {
            const hash = vectors[doc].reduce((a, b) => a + b);
            if (!bucket[hash]) {
                bucket[hash] = [];
            }
            bucket[hash].push(doc);
        }
        return bucket;
    }
    findDuplicates(candidates) {
        let docIds = [];
        candidates.forEach((item) => {
            docIds = docIds.concat(item);
        });
        const docsShingles = this.shinglesMatrix.getDocShingles(docIds);
        for (const pair of candidates) {
            this.compare(pair, docsShingles);
        }
    }
    compress(bucket) {
        for (const hash in bucket) {
            if (bucket[hash].length > 1 &&
                !this.hashRegister.check(bucket[hash].join(""))) {
                this.candidates.push(bucket[hash]);
                this.emit("found_candidates", bucket[hash]);
            }
        }
    }
    compare(docIds, shingles) {
        for (const current of docIds) {
            docIds.shift();
            const currentShingles = shingles[current];
            for (const doc of docIds) {
                if (current === doc) {
                    continue;
                }
                const jaccard = this.compareShingles(currentShingles, shingles[doc]);
                if (jaccard >= this.config.minSimilarity) {
                    if (typeof this.duplicates[current] === "undefined") {
                        this.duplicates[current] = [];
                    }
                    this.duplicates[current].push([jaccard, doc]);
                    this.emit("found_duplicates", [current, doc]);
                }
            }
        }
    }
    compareShingles(s1, s2) {
        const similar = [];
        const total = [];
        for (const tuple of s1) {
            let min = tuple[0];
            let max = tuple[0];
            const s2tuples = s2.filter((t) => t[1] === tuple[1]);
            if (s2tuples.length > 0) {
                min = min < s2tuples[0][0] ? min : s2tuples[0][0];
                max = max > s2tuples[0][0] ? max : s2tuples[0][0];
                for (let i = 1; i <= min; i += 1) {
                    similar.push(tuple[1]);
                }
            }
            for (let i = 1; i <= max; i += 1) {
                total.push(tuple[1]);
            }
        }
        for (const tuple of s2) {
            if (!total.includes(tuple[1])) {
                for (let i = 1; i <= tuple[0]; i += 1) {
                    total.push(tuple[1]);
                }
            }
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
    if (config.shinglesType === "char") {
        shingleTool = new StringShinglingTool_1.default(config.shinglesSize, (0, hasherFactory_1.getCompactHasher)());
    }
    else {
        shingleTool = new WordShinglingTool_1.default(config.shinglesSize, (0, hasherFactory_1.getCompactHasher)());
    }
    return new NearDuplicatesFinder({ rowsPerBand: config.rowsPerBand, minSimilarity: config.minSimilarity }, new SparseMatrix_1.default(), new SignatureMatrix_1.default(config.signatureLength, SaltGenerator_1.default), shingleTool, (0, filterFactory_1.baseFilterFactory)());
};
exports.makeFinder = makeFinder;
//# sourceMappingURL=NearDuplicatesFinder.js.map
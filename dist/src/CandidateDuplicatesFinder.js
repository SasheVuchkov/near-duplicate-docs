"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const HashRegister_1 = __importDefault(require("./Util/HashRegister"));
class CandidateDuplicatesFinder extends events_1.EventEmitter {
    constructor(config, shinglesMatrix, signatureMatrix, shinglingTool) {
        super();
        this.candidates = [];
        this.hashRegister = new HashRegister_1.default("md5");
        this.add = (docId, text) => {
            this.shinglingTool.process(docId, text, (docId, shingle) => {
                this.shinglesMatrix.addItem(shingle.toString(), docId);
            });
            this.emit("doc_added", docId);
        };
        (this.config = config), (this.shinglesMatrix = shinglesMatrix);
        this.signatureMatrix = signatureMatrix;
        this.shinglingTool = shinglingTool;
    }
    getDocShingles(docIds) {
        return this.shinglesMatrix.getDocShingles(docIds);
    }
    search() {
        this.emit("search");
        this.signatureMatrix.fromSparseMatrix(this.shinglesMatrix);
        const rows = this.signatureMatrix.getSignatureRows();
        const rowsPerBand = this.config.rowsPerBand;
        const currentVectors = [];
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
            if (counter < this.signatureMatrix.getSignatureLength() &&
                counter % rowsPerBand != 0) {
                continue;
            }
            const bucket = this.sort([...docIds], currentVectors[bandKey]);
            this.compress(bucket);
            bandKey += 1;
        }
        this.emit("finish", this.candidates);
        return this.candidates;
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
    sort(docIds, vectors) {
        const bucket = {};
        for (const doc of docIds) {
            const hash = vectors[doc].join("");
            if (!bucket[hash]) {
                bucket[hash] = [];
            }
            bucket[hash].push(doc);
        }
        return bucket;
    }
}
exports.default = CandidateDuplicatesFinder;
//# sourceMappingURL=CandidateDuplicatesFinder.js.map
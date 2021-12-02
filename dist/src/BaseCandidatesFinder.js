"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const CandidatesBucket_1 = __importDefault(require("./Util/CandidatesBucket"));
class BaseCandidatesFinder extends events_1.EventEmitter {
    constructor(config, shinglesMatrix, signatureMatrix, shinglingTool) {
        super();
        this.add = (docId, text) => {
            this.shinglingTool.process(docId, text, (docId, shingle) => {
                this.shinglesMatrix.addItem(shingle.toString(), docId);
            });
            this.emit("doc_added", docId);
        };
        this.config = config;
        this.shinglesMatrix = shinglesMatrix;
        this.signatureMatrix = signatureMatrix;
        this.shinglingTool = shinglingTool;
    }
    getDocShingles(docIds) {
        return this.shinglesMatrix.getDocShingles(docIds);
    }
    search() {
        this.emit("search");
        this.signatureMatrix.fromSparseMatrix(this.shinglesMatrix);
        const rows = this.signatureMatrix.getRows();
        const rowsPerBand = this.config.rowsPerBand;
        const currentVectors = [];
        const bucket = new CandidatesBucket_1.default();
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
            this.hash(docIds, currentVectors[bandKey], bucket);
            bandKey += 1;
        }
        const candidates = bucket.dump();
        this.emit("finish", candidates);
        return candidates;
    }
    /**
     * We use hashes of the signature fragments to find
     * candidates for detailed comparison in a speed manner
     * @param docIds
     * @param vectors
     * @param bucket
     * @protected
     */
    hash(docIds, vectors, bucket) {
        for (const doc of docIds) {
            const hash = vectors[doc].join("");
            bucket.add(hash, doc);
        }
        return bucket;
    }
}
exports.default = BaseCandidatesFinder;
//# sourceMappingURL=BaseCandidatesFinder.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SparseMatrix {
    constructor() {
        this.rows = {};
    }
    getRows() {
        return this.rows;
    }
    getPayload(key) {
        return this.rows[key];
    }
    getShingles() {
        return Object.keys(this.rows);
    }
    getDocShingles(docIds) {
        var _a;
        const shingles = {};
        for (const shingle in this.rows) {
            for (const docId of docIds) {
                const docs = this.rows[shingle].filter((item) => docId === item[1]);
                if (docs.length > 0) {
                    shingles[docId] = (_a = shingles[docId]) !== null && _a !== void 0 ? _a : [];
                    shingles[docId].push(shingle);
                }
            }
        }
        return shingles;
    }
    addItem(key, payload) {
        if (!this.rows[key]) {
            this.rows[key] = [[1, payload]];
            return this;
        }
        this.rows[key].forEach((payload) => {
            payload[0] += 1;
        });
        return this;
    }
}
exports.default = SparseMatrix;
//# sourceMappingURL=SparseMatrix.js.map
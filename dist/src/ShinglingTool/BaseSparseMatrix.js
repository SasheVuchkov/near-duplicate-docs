"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseSparseMatrix {
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
        const shingles = {};
        for (const shingle in this.rows) {
            for (const id of docIds) {
                if (!shingles[id]) {
                    shingles[id] = [];
                }
                if (this.rows[shingle][id]) {
                    shingles[id].push([this.rows[shingle][id], shingle]);
                }
            }
        }
        return shingles;
    }
    addItem(key, payload) {
        if (!this.rows[key]) {
            this.rows[key] = {};
        }
        if (!this.rows[key][payload]) {
            this.rows[key][payload] = 1;
            return this;
        }
        this.rows[key][payload] += 1;
        return this;
    }
}
exports.default = BaseSparseMatrix;
//# sourceMappingURL=BaseSparseMatrix.js.map
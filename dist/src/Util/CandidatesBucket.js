"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CandidatesBucket {
    constructor() {
        this.data = {};
        this.index = {};
    }
    add(hash, doc) {
        if (!this.data[hash]) {
            this.data[hash] = [];
        }
        if (!this.index[doc]) {
            this.index[doc] = [];
        }
        this.data[hash].push(doc);
        this.index[doc].push(hash);
        return this;
    }
    compress() {
        const data = [];
        for (const hash in this.data) {
            if (this.data[hash].length < 2) {
                continue;
            }
            const candidates = this.checkIndex([...this.data[hash]]);
            data.push(candidates);
        }
        return data;
    }
    checkIndex(data) {
        for (const docId of data) {
            if (this.index[docId].length > 1) {
                for (const indexedHash of this.index[docId]) {
                    if (!this.data[indexedHash]) {
                        continue;
                    }
                    data = [...data, ...this.data[indexedHash]].filter((item, index, arr) => index === arr.indexOf(item));
                    delete this.data[indexedHash];
                }
            }
        }
        return data;
    }
    getData() {
        return this.data;
    }
}
exports.default = CandidatesBucket;
//# sourceMappingURL=CandidatesBucket.js.map
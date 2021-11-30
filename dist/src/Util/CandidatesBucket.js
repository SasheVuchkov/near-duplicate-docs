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
        const copy = Object.assign({}, this.data);
        for (const hash in copy) {
            if (copy[hash].length < 2) {
                continue;
            }
            const candidates = this.checkIndex([...this.data[hash]], copy);
            data.push(candidates);
        }
        return data;
    }
    checkIndex(data, copy) {
        for (const docId of data) {
            if (this.index[docId].length > 1) {
                for (const indexedHash of this.index[docId]) {
                    if (!copy[indexedHash]) {
                        continue;
                    }
                    data = [...data, ...copy[indexedHash]].filter((item, index, arr) => index === arr.indexOf(item));
                    delete copy[indexedHash];
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
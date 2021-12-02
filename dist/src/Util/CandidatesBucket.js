"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CandidatesBucket {
    constructor() {
        this.data = {};
    }
    add(hash, doc) {
        if (!this.data[hash]) {
            this.data[hash] = [];
        }
        this.data[hash].push(doc);
        return this;
    }
    compress() {
        const index = {};
        const bucket = {};
        for (const hash in this.data) {
            if (this.data[hash].length < 2) {
                continue;
            }
            let hashAppended = false;
            for (const docId of this.data[hash]) {
                if (!index[docId]) {
                    index[docId] = hash;
                }
                if (hashAppended) {
                    continue;
                }
                if (!bucket[index[docId]]) {
                    bucket[index[docId]] = [];
                }
                bucket[index[docId]] = bucket[index[docId]]
                    .concat(this.data[hash])
                    .filter((item, index, arr) => index === arr.indexOf(item));
                hashAppended = true;
            }
        }
        return Object.values(bucket);
    }
    getData() {
        return this.data;
    }
}
exports.default = CandidatesBucket;
//# sourceMappingURL=CandidatesBucket.js.map
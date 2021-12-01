"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractNearDuplicatesFinder_1 = require("./AbstractNearDuplicatesFinder");
class AsyncNearDuplicatesFinder extends AbstractNearDuplicatesFinder_1.AbstractNearDuplicatesFinder {
    add(docId, text) {
        return new Promise((resolve) => {
            this.candidatesFinder.add(docId, text);
            this.emit("doc_added", docId);
            resolve();
        });
    }
    search() {
        return new Promise((resolve) => {
            this.emit("search");
            const candidates = this.candidatesFinder.search();
            const duplicates = this.process(candidates);
            this.emit("finish", duplicates);
            resolve(duplicates);
        });
    }
}
exports.default = AsyncNearDuplicatesFinder;
//# sourceMappingURL=AsyncNearDuplicatesFinder.js.map
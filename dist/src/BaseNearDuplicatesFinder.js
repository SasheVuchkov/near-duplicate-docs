"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractNearDuplicatesFinder_1 = require("./AbstractNearDuplicatesFinder");
class BaseNearDuplicatesFinder extends AbstractNearDuplicatesFinder_1.AbstractNearDuplicatesFinder {
    add(docId, text) {
        this.candidatesFinder.add(docId, text);
        this.emit("doc_added", docId);
    }
    search() {
        this.emit("search");
        const candidates = this.candidatesFinder.search();
        const duplicates = this.process(candidates);
        this.emit("finish", duplicates);
        return duplicates;
    }
}
exports.default = BaseNearDuplicatesFinder;
//# sourceMappingURL=BaseNearDuplicatesFinder.js.map
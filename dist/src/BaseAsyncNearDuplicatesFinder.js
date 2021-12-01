"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractNearDuplicatesFinder_1 = __importDefault(require("./AbstractNearDuplicatesFinder"));
class BaseAsyncNearDuplicatesFinder extends AbstractNearDuplicatesFinder_1.default {
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
exports.default = BaseAsyncNearDuplicatesFinder;
//# sourceMappingURL=BaseAsyncNearDuplicatesFinder.js.map
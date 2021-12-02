"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractNearDuplicatesFinder_1 = __importDefault(require("./AbstractNearDuplicatesFinder"));
class BaseNearDuplicatesFinder extends AbstractNearDuplicatesFinder_1.default {
    add(docId, text) {
        this.candidatesFinder.add(docId.toString(), text.toString());
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
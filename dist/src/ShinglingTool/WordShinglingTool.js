"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseShinglingTool_1 = require("./BaseShinglingTool");
class WordShinglingTool extends BaseShinglingTool_1.BaseShinglingTool {
    process(docId, text, callback) {
        //If the language doesn't use spaces, you must use StringShinglingTool
        const items = text.split(" ");
        let startPosition = 0;
        let endPosition = this.shingleSize;
        if (text.length > 0 && items.length < this.shingleSize) {
            callback(docId, text);
            return;
        }
        while (endPosition <= items.length) {
            const shingle = this.hasher(items.slice(startPosition, endPosition).join(" "));
            callback(docId, shingle);
            startPosition += 1;
            endPosition += 1;
        }
    }
}
exports.default = WordShinglingTool;
//# sourceMappingURL=WordShinglingTool.js.map
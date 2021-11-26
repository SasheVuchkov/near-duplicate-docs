"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseShinglingTool_1 = require("./BaseShinglingTool");
class StringShinglingTool extends BaseShinglingTool_1.BaseShinglingTool {
    process(docId, text, callback) {
        const items = [...text];
        const startPosition = 0;
        let endPosition = this.shingleSize;
        while (endPosition < items.length) {
            const shingle = this.hasher(items.slice(startPosition, endPosition).join(""));
            callback(docId, shingle);
            endPosition += 1;
        }
    }
}
exports.default = StringShinglingTool;
//# sourceMappingURL=StringShinglingTool.js.map
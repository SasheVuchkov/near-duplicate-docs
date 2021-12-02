"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseShinglingTool_1 = require("./BaseShinglingTool");
class StringShinglingTool extends BaseShinglingTool_1.BaseShinglingTool {
    process(docId, text, callback) {
        /**
         * Let's deconstruct the string into array of characters and eliminate the need
         * to handle by ourselves some of the complexities related to unicode characters.
         */
        const items = [...text];
        let startPosition = 0;
        let endPosition = this.shingleSize;
        if (text.length > 0 && text.length < this.shingleSize) {
            callback(docId, text);
            return;
        }
        while (endPosition <= items.length) {
            const shingle = this.hasher(items.slice(startPosition, endPosition).join(""));
            callback(docId, shingle);
            startPosition += 1;
            endPosition += 1;
        }
    }
}
exports.default = StringShinglingTool;
//# sourceMappingURL=StringShinglingTool.js.map
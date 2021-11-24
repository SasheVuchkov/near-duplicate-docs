"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseShinglingTool_1 = require("./BaseShinglingTool");
class WordShinglingTool extends BaseShinglingTool_1.BaseShinglingTool {
    process(docId, text, callback, str) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = text.split(' ');
            let startPosition = 0;
            let endPosition = this.shingleSize;
            while (endPosition < items.length) {
                const shingle = !str ? this.hasher(items.slice(startPosition, endPosition).join(' ')) : items.slice(startPosition, endPosition).join(' ');
                callback(docId, shingle);
                startPosition += 1;
                endPosition += 1;
            }
        });
    }
}
exports.default = WordShinglingTool;
//# sourceMappingURL=WordShinglingTool.js.map
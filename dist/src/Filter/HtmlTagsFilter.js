"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const striptags_1 = __importDefault(require("striptags"));
class HtmlTagsFilter {
    constructor() {
        this.filter = (text) => {
            return (0, striptags_1.default)(text, [], ' ');
        };
    }
}
exports.default = HtmlTagsFilter;
//# sourceMappingURL=HtmlTagsFilter.js.map
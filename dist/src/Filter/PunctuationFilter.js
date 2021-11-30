"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseFilter_1 = __importDefault(require("./BaseFilter"));
class PunctuationFilter extends BaseFilter_1.default {
    constructor() {
        super(...arguments);
        this.punctuationRegex = /[.,:;?)!(\][}{"]+/gi;
        this.filter = (text) => {
            return text.replace(this.punctuationRegex, "");
        };
    }
}
exports.default = PunctuationFilter;
//# sourceMappingURL=PunctuationFilter.js.map
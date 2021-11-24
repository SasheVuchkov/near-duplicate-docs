"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WhitespaceFilter {
    constructor() {
        this.punctuationRegex = /[\s]+/gi;
        this.filter = (text) => {
            return text.replace(this.punctuationRegex, ' ');
        };
    }
}
exports.default = WhitespaceFilter;
//# sourceMappingURL=PunctuationFilter.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PunctuationFilter {
    constructor() {
        this.punctuationRegex = /[.,:;?)!(\][}{"]+/gi;
        this.filter = (text) => {
            return text.replace(this.punctuationRegex, "");
        };
    }
}
exports.default = PunctuationFilter;
//# sourceMappingURL=PunctuationFilter.js.map
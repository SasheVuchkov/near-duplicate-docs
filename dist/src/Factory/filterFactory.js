"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseFilterFactory = void 0;
const BaseFilter_1 = __importDefault(require("../Filter/BaseFilter"));
const HtmlTagsFilter_1 = __importDefault(require("../Filter/HtmlTagsFilter"));
const WhitespaceFilter_1 = __importDefault(require("../Filter/WhitespaceFilter"));
const PunctuationFilter_1 = __importDefault(require("../Filter/PunctuationFilter"));
const baseFilterFactory = () => {
    const base = new BaseFilter_1.default();
    base.addFilter(new HtmlTagsFilter_1.default());
    base.addFilter(new WhitespaceFilter_1.default());
    base.addFilter(new PunctuationFilter_1.default());
    return base;
};
exports.baseFilterFactory = baseFilterFactory;
//# sourceMappingURL=filterFactory.js.map
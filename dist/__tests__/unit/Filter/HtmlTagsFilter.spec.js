"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlTagsFilter_1 = __importDefault(require("../../../src/Filter/HtmlTagsFilter"));
describe("Testing HtmlTagasFilter class", () => {
    const filter = new HtmlTagsFilter_1.default();
    const data = [
        [
            "String with no tags remain the same",
            "String with no tags",
            "String with no tags",
        ],
        ["Empty string doesn't break the method", "", ""],
        [
            "Any tag in a string is stripped away",
            "Any <strong>tag</strong> in <a>a</a> string is <span>stripped</span> away!",
            "Any  tag  in  a  string is  stripped  away!",
        ],
    ];
    test.each(data)("Test Case: %s", (testcase, input, expected) => {
        expect(filter.filter(input)).toEqual(expected);
    });
});
//# sourceMappingURL=HtmlTagsFilter.spec.js.map
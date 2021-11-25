"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PunctuationFilter_1 = __importDefault(require("../../src/Filter/PunctuationFilter"));
describe('Testing PunctuationFilter class', () => {
    const filter = new PunctuationFilter_1.default();
    const data = [
        ['Strings with no punctuation remain the same', 'String with no punctuation', 'String with no punctuation'],
        ['Any punctuation in a string is replaced with empty string', 'What I love? I love, let\'s say, ice cream.;:{}()[]', 'What I love I love let\'s say ice cream'],
    ];
    test.each(data)('Test Case: %s', (testcase, input, expected) => {
        expect(filter.filter(input)).toEqual(expected);
    });
});
//# sourceMappingURL=PunctuationFilter.spec.js.map
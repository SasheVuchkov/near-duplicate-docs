"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WhitespaceFilter_1 = __importDefault(require("../../src/Filter/WhitespaceFilter"));
describe('Testing WhitespaceFilter class', () => {
    const filter = new WhitespaceFilter_1.default();
    const data = [
        ['Tabs in string must be replaced with spaces', 'Some   string  with    whitespaces .', 'Some string with whitespaces .'],
        ['Any non-space whitespace must be replaced with spaces', 'Some     string \n\r with\nmore\rspaces .', 'Some string with more spaces .'],
        ['String with no spaces remains unchanged', 'Nospaceshere', 'Nospaceshere'],
        ['Method doesn\'t crash when the input is empty string', '', ''],
        ['Method doesn\'t crash when the input is just spaces', '   ', ' '],
    ];
    test.each(data)('Test Case: %s', (testcase, input, expected) => {
        expect(filter.filter(input)).toEqual(expected);
    });
});
//# sourceMappingURL=WhitespaceFilter.spec.js.map
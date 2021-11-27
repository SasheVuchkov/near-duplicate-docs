"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WordShinglingTool_1 = __importDefault(require("../../src/ShinglingTool/WordShinglingTool"));
describe("Testing ShinglingTool/StringShinglingTool class", () => {
    const tool = new WordShinglingTool_1.default(3, (shingle) => shingle);
    const data = [
        [
            "Test case: String with more words than the shingle length",
            "Not so long ok then.",
            ["Not so long", "so long ok", "long ok then."],
        ],
        [
            "Test case: String with number of words equal the shingle length",
            "Not so long",
            ["Not so long"],
        ],
        [
            "Test case: String with less words than the shingle length",
            "Not so",
            ["Not so"],
        ],
        ["Test case: Empty string", "", []],
    ];
    test.each(data)("%s", (testCase, text, expected) => {
        const shingles = [];
        tool.process("randomId", text, (docId, shingle) => {
            shingles.push(shingle);
        });
        console.log(shingles);
        expect(shingles.length).toEqual(expected.length);
        shingles.forEach((sh, index) => {
            expect(sh).toEqual(expected[index]);
        });
    });
});
//# sourceMappingURL=WordShinglingTool.spec.js.map
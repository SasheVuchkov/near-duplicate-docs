"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StringShinglingTool_1 = __importDefault(require("../../../src/ShinglingTool/StringShinglingTool"));
describe("Testing ShinglingTool/StringShinglingTool class", () => {
    const tool = new StringShinglingTool_1.default(6, (shingle) => shingle);
    const data = [
        [
            "Test case: String with length that is bigger than the shingle length",
            "Not so long ",
            ["Not so", " long "],
        ],
        [
            "Test case: String with length that is equal the shingle length",
            "Not so",
            ["Not so"],
        ],
        [
            "Test case: String with length that is less the shingle length",
            "Not",
            ["Not"],
        ],
        ["Test case: Empty string", "", []],
        [
            "Test case: String with non ascii symbols",
            "Като игра на тронове, ама във ваната",
            [
                "Като и",
                "гра на",
                " троно",
                "ве, ам",
                "а във ",
                "ваната",
            ],
        ],
    ];
    test.each(data)("%s", (testCase, text, expected) => {
        const shingles = [];
        tool.process("randomId", text, (docId, shingle) => {
            shingles.push(shingle);
        });
        expect(shingles.length).toEqual(expected.length);
        shingles.forEach((sh, index) => {
            expect(sh).toEqual(expected[index]);
        });
    });
});
//# sourceMappingURL=StringShinglingTool.spec.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SparseMatrix_1 = __importDefault(require("../../src/ShinglingTool/SparseMatrix"));
const WordShinglingTool_1 = __importDefault(require("../../src/ShinglingTool/WordShinglingTool"));
describe("Testig ShinglingTool/SparceMatrix class", () => {
    const text = "Like Game of Thrones, but in a bathtub, no - Like Game of Thrones, but on a bicycle.";
    const expected = [
        [2, "Like Game of"],
        [2, "Game of Thrones,"],
        [2, "of Thrones, but"],
        [1, "Thrones, but in"],
        [1, "Thrones, but on"],
        [1, "but in a"],
        [1, "in a bathtub,"],
        [1, "a bathtub, no"],
        [1, "bathtub, no -"],
        [1, "no - Like"],
        [1, "- Like Game"],
        [1, "but on a"],
        [1, "on a bicycle."],
    ];
    test("Test case: Testing that the matrix returns the right shingles per document", () => {
        const tool = new WordShinglingTool_1.default(3, (str) => str);
        const matrix = new SparseMatrix_1.default();
        tool.process("randomId", text, (docId, shingle) => {
            matrix.addItem(shingle.toString(), docId);
        });
        const data = matrix.getDocShingles(["randomId", "undefined"]);
        const rows = matrix.getRows();
        expect(data.randomId.length).toEqual(expected.length);
        expected.forEach((item) => {
            expect(data.randomId.includes(item[1])).toEqual(true);
            expect(Object.keys(rows).includes(item[1])).toEqual(true);
        });
    });
    test("Test case: Testing the addItem method", () => {
        const tool = new WordShinglingTool_1.default(3, (str) => str);
        const matrix = new SparseMatrix_1.default();
        tool.process("randomId", text, (docId, shingle) => {
            matrix.addItem(shingle.toString(), docId);
        });
        const shingles = matrix.getShingles();
        expect(shingles.length).toEqual(expected.length);
        expected.forEach((item) => {
            expect(shingles.includes(item[1])).toEqual(true);
        });
        expected.forEach((item) => {
            const shingle = matrix.getPayload(item[1]);
            expect(shingle).not.toEqual("undefined");
            if (shingle) {
                expect(shingle[0][0]).toEqual(item[0]);
            }
        });
    });
});
//# sourceMappingURL=SparceMatrix.spec.js.map
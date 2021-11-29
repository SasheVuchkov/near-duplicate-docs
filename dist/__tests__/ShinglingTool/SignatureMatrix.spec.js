"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SignatureMatrix_1 = __importDefault(require("../../src/ShinglingTool/SignatureMatrix"));
const SparseMatrix_1 = __importDefault(require("../../src/ShinglingTool/SparseMatrix"));
describe("Testing ShinglingTool/SignatureMatrix class", () => {
    let generatorCalled = 0;
    const saltGeneratorMock = () => [555, 666, 777, 888][generatorCalled++];
    test("Test case: The method getSignatureLength return the right value", () => {
        const matrix = new SignatureMatrix_1.default(100, saltGeneratorMock);
        expect(matrix.getSignatureLength()).toEqual(100);
    });
    test("Test case: The method getRows return the right values", () => {
        generatorCalled = 0;
        const matrix = new SignatureMatrix_1.default(3, saltGeneratorMock);
        const shinglingMatrix = new SparseMatrix_1.default();
        shinglingMatrix.addItem("Like Die Hard", "document1");
        shinglingMatrix.addItem("but with sloths", "document1");
        shinglingMatrix.addItem("and giant ladybugs", "document1");
        const noMatrixResult = matrix.getSignatureRows();
        expect(noMatrixResult.next()).toEqual({ done: true, value: undefined });
        matrix.fromSparseMatrix(shinglingMatrix);
        const expectedCount = 3;
        const expectedRows = [
            undefined,
            { document1: { "555": 4466002 } },
            { document1: { "666": 4466147 } },
            { document1: { "777": 4465776 } },
        ];
        let count = 0;
        const rows = matrix.getSignatureRows();
        for (const row of rows) {
            count += 1;
            expect(row).toEqual(expectedRows[count]);
        }
        expect(count).toEqual(expectedCount);
    });
});
//# sourceMappingURL=SignatureMatrix.spec.js.map
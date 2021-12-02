"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matrixFactory_1 = require("../../../src/Factory/matrixFactory");
const index_1 = require("../../../index");
describe("Testing Factory/matrixFactory", () => {
    test("Test case: Is BaseSparseMatrix", () => {
        const finder = (0, matrixFactory_1.makeBaseSparseMatrix)();
        expect(finder).toBeInstanceOf(index_1.BaseSparseMatrix);
    });
    test("Test case: Is BaseSignatureMatrix", () => {
        const finder = (0, matrixFactory_1.makeSignatureMatrix)(100);
        expect(finder).toBeInstanceOf(index_1.BaseSignatureMatrix);
    });
});
//# sourceMappingURL=matrixFactory.spec.js.map
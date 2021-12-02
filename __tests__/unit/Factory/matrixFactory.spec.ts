import {
  makeBaseSparseMatrix,
  makeSignatureMatrix,
} from "../../../src/Factory/matrixFactory";
import { BaseSignatureMatrix, BaseSparseMatrix } from "../../../index";

describe("Testing Factory/matrixFactory", () => {
  test("Test case: Is BaseSparseMatrix", () => {
    const finder = makeBaseSparseMatrix();
    expect(finder).toBeInstanceOf(BaseSparseMatrix);
  });

  test("Test case: Is BaseSignatureMatrix", () => {
    const finder = makeSignatureMatrix(100);
    expect(finder).toBeInstanceOf(BaseSignatureMatrix);
  });
});

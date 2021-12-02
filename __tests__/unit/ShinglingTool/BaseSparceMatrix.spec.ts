import BaseSparseMatrix from "../../../src/ShinglingTool/BaseSparseMatrix";
import WordShinglingTool from "../../../src/ShinglingTool/WordShinglingTool";
import { Shingle } from "../../../src/ShinglingTool/ShinglingTool";

describe("Testig ShinglingTool/SparceMatrix class", () => {
  const text =
    "Like Game of Thrones, but in a bathtub, no - Like Game of Thrones, but on a bicycle.";
  const expected: [number, Shingle][] = [
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
    const tool = new WordShinglingTool(3, (str: string): Shingle => str);
    const matrix = new BaseSparseMatrix();
    tool.process("randomId", text, (docId: string, shingle: Shingle) => {
      matrix.addItem(shingle.toString(), docId);
    });

    const data = matrix.getDocShingles(["randomId", "undefined"]);
    const rows = matrix.getRows();
    expect(Object.keys(data.randomId).length).toEqual(expected.length);
    expected.forEach((item) => {
      expect(
        Object.keys(data.randomId).filter((shingle) => shingle === item[1])
          .length
      ).not.toEqual(0);
      expect(Object.keys(rows).includes(item[1].toString())).toEqual(true);
    });
  });

  test("Test case: Testing the addItem method", () => {
    const tool = new WordShinglingTool(3, (str: string): Shingle => str);
    const matrix = new BaseSparseMatrix();
    tool.process("randomId", text, (docId: string, shingle: Shingle) => {
      matrix.addItem(shingle.toString(), docId);
    });
    const shingles = matrix.getShingles();
    expected.forEach((item) => {
      expect(shingles.includes(item[1].toString())).toEqual(true);
    });

    expected.forEach((item) => {
      const shingle = matrix.getPayload(item[1].toString());
      expect(shingle).not.toEqual("undefined");
      if (shingle) {
        expect(shingle.randomId).toEqual(item[0]);
      }
    });
  });
});

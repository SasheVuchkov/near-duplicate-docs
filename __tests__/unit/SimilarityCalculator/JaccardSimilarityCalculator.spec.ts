import BaseSparseMatrix from "../../../src/ShinglingTool/BaseSparseMatrix";
import JaccardSimilarityCalculator from "../../../src/SimilarityCalculator/JaccardSimilarityCalculator";
import { getCompactHasher } from "../../../src/Factory/hasherFactory";
import { Shingle } from "../../../src/ShinglingTool/ShinglingTool";
import WordShinglingTool from "../../../src/ShinglingTool/WordShinglingTool";

describe("Testing SimilarityCalculator/JaccardSimilarityCalculator calss", () => {
  const shinglingTool = new WordShinglingTool(4, getCompactHasher());
  const calc = new JaccardSimilarityCalculator();

  const data: [string, string[], any][] = [
    [
      "Test case: Finding identical texts (score=1)",
      [
        "Like The Rings of The Lord, but with pink parrots",
        "Like The Rings of The Lord, but with pink parrots",
      ],
      { text0: [[1, "text1"]] },
    ],
    [
      "Test case: Finding Similar texts / shingle bags (score=1)",
      [
        "Like The Rings of The Lord, but with pink parrots",
        "Like The Rings of The Lord, but with pink parrots Like The Rings of The Lord, but with pink parrots",
      ],
      { text0: [[0.4117647058823529, "text1"]] },
    ],

    [
      "Test case: Finding near identical texts (score=0.76)",
      [
        "Like The Rings of The Lord, but with pink parrots",
        "Like The Rings of The Lord, but with pink poodles",
      ],
      { text0: [[0.75, "text1"]] },
    ],
    [
      "Test case: Totally different identical texts (score=0)",
      [
        "Like The Rings of The Lord, but with pink parrots",
        "Feels way better than Game of Thrones in a bathtub",
      ],
      { text0: [[0, "text1"]] },
    ],
    [
      "Test case: Finding less similar texts (score=0.76)",
      [
        "Like Game of Thrones, but with lasers and Piña colada",
        "Like Game of Thrones, but in a bathtub",
      ],
      { text0: [[0.2, "text1"]] },
    ],
  ];

  test.each(data)(
    "%s",
    (testCase: string, strings: string[], expected: any) => {
      const matrix = new BaseSparseMatrix();
      const docIds: string[] = [];
      strings.forEach((str, index) => {
        docIds.push(`text${index}`);
        shinglingTool.process(
          `text${index}`,
          str,
          (docId: string, shingle: Shingle) => {
            matrix.addItem(shingle.toString(), docId);
          }
        );
      });

      const shingles = matrix.getDocShingles(docIds);

      const scores = calc.calculate(docIds, shingles);
      expect(scores).toEqual(expected);
    }
  );
});

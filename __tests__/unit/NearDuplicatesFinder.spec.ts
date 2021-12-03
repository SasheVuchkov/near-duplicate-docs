import { makeDuplicatesFinderWithMocks } from "../../src/Factory/duplicatesFinderFactory";

describe("Testing NearDuplicateFinder class", () => {
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
      {},
    ],

    [
      "Test case: Finding near identical texts (score=0.76)",
      [
        "Like The Rings of The Lord, but with pink parrots",
        "Like The Rings of The Lord, but with pink poodles",
      ],
      { text0: [[0.7647058823529411, "text1"]] },
    ],
    [
      "Test case: Totally different identical texts (score=0)",
      [
        "Like The Rings of The Lord, but with pink parrots",
        "Feels way better than Game of Thrones in a bathtub",
      ],
      {},
    ],
    [
      "Test case: Finding less similar texts (score=0.76)",
      [
        "Like Game of Thrones, but with lasers and Piña colada",
        "Like Game of Thrones, but in a bathtub",
      ],
      {},
    ],
    [
      "Test case: Finding less similar texts and don't return empty results",
      [
        "Like Game of Thrones, but with lasers and Piña colada",
        "Like Game of Thrones, but in a bathtub",
        "Like Game of Thrones, but in a bathtub",
        "Like Game of Echo, but in a den and",
      ],
      { text1: [[1, "text2"]] },
    ],
  ];

  test.each(data)("%s", (testCase, texts, expected) => {
    const finder = makeDuplicatesFinderWithMocks({
      minSimilarity: 0.6,
      shinglesSize: 5,
      shinglesType: "char",
      signatureLength: 100,
      rowsPerBand: 5,
    });
    texts.forEach((txt, index) => {
      finder.add(`text${index}`, txt);
    });
    const duplicates = finder.search();
    expect(duplicates).toEqual(expected);
  });
});

import IsMinSimilarityGuard from "../../../src/Guard/IsMinSimilarityGuard";
import ApplicatorGuard from "../../../src/Guard/ApplicatorGuard";
import IsRowsPerBandGuard from "../../../src/Guard/IsRowsPerBandGuard";

describe("Testing Guard/ApplicatorGuard", () => {
  const data: [string, any, [boolean, string]][] = [
    [
      "Test case: Is not minSimilarity",
      { minSimilarity: -5, rowsPerBand: 5 },
      [
        false,
        `Missing or incorrect 'minSimilarity': it must be number between 0 and 1.`,
      ],
    ],
    [
      "Test case: Is not minSimilarity and rowsPerBand",
      { minSimilarity: -5, rowsPerBand: {} },
      [
        false,
        `Missing or incorrect 'rowsPerBand': it must be number equal or larger than 1.`,
      ],
    ],
    [
      "Test case: Is not rowsPerBand",
      { minSimilarity: 0.5, rowsPerBand: "fasfd" },
      [
        false,
        `Missing or incorrect 'rowsPerBand': it must be number equal or larger than 1.`,
      ],
    ],
    [
      "Test case: Everything is OK",
      { minSimilarity: 1, rowsPerBand: 5 },
      [true, `Some of the guards returned false`],
    ],
  ];

  test.each(data)("%s", (testCase, data, expected) => {
    const guard = new ApplicatorGuard();

    guard.addGuard(new IsMinSimilarityGuard());
    guard.addGuard(new IsRowsPerBandGuard());

    expect(guard.isValid(data)).toEqual(expected[0]);
    expect(guard.getMessage()).toEqual(expected[1]);
  });
});

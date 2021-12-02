import {
  makeNearDuplicateFinderConfigGuard,
  makeCandidatesFinderConfigGuard,
} from "../../../src/Factory/guardFactory";

describe("Testing Factory/guardFactory", () => {
  let data: [string, any, boolean][] = [
    [
      "Test case: Wrong minSimilarity",
      {
        minSimilarity: -1,
        rowsPerBand: 5,
        signatureLength: 100,
        shinglesType: "char",
        shinglesSize: 5,
      },
      false,
    ],
    [
      "Test case: Wrong rowsPerBand",
      {
        minSimilarity: 0.3,
        rowsPerBand: "fasdf",
        signatureLength: 100,
        shinglesType: "char",
        shinglesSize: 5,
      },
      false,
    ],
    [
      "Test case: Wrong signatureLength",
      {
        minSimilarity: 0.9,
        rowsPerBand: 5,
        signatureLength: 0,
        shinglesType: "char",
        shinglesSize: 5,
      },
      false,
    ],
    [
      "Test case: Wrong shinglesType",
      {
        minSimilarity: 1,
        rowsPerBand: 5,
        signatureLength: 100,
        shinglesType: "wave",
        shinglesSize: 5,
      },
      false,
    ],
    [
      "Test case: Wrong shinglesSize",
      {
        minSimilarity: -1,
        rowsPerBand: 5,
        signatureLength: 100,
        shinglesType: "char",
        shinglesSize: {},
      },
      false,
    ],
    [
      "Test case: Is Config",
      {
        minSimilarity: 1,
        rowsPerBand: 5,
        signatureLength: 100,
        shinglesType: "char",
        shinglesSize: 5,
      },
      true,
    ],
  ];

  test.each(data)("%s", (testCase, data, expected) => {
    const applicator = makeNearDuplicateFinderConfigGuard();
    expect(applicator.isValid(data)).toEqual(expected);
  });

  data = [
    [
      "Test case: Wrong rowsPerBand",
      {
        rowsPerBand: "fasdf",
        signatureLength: 100,
        shinglesType: "char",
        shinglesSize: 5,
      },
      false,
    ],
    [
      "Test case: Wrong signatureLength",
      {
        rowsPerBand: 5,
        signatureLength: 0,
        shinglesType: "char",
        shinglesSize: 5,
      },
      false,
    ],
    [
      "Test case: Wrong shinglesType",
      {
        rowsPerBand: 5,
        signatureLength: 100,
        shinglesType: "wave",
        shinglesSize: 5,
      },
      false,
    ],
    [
      "Test case: Wrong shinglesSize",
      {
        rowsPerBand: 5,
        signatureLength: 100,
        shinglesType: "char",
        shinglesSize: {},
      },
      false,
    ],
    [
      "Test case: Is Config",
      {
        rowsPerBand: 5,
        signatureLength: 100,
        shinglesType: "char",
        shinglesSize: 5,
      },
      true,
    ],
  ];

  test.each(data)("%s", (testCase, data, expected) => {
    const applicator = makeCandidatesFinderConfigGuard();
    expect(applicator.isValid(data)).toEqual(expected);
  });
});

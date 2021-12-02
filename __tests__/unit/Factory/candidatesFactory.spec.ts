import BaseCandidatesFinder from "../../../src/BaseCandidatesFinder";
import {
  makeCandidatesFinder,
  Config,
  isConfig,
} from "../../../src/Factory/candidatesFinderFactory";

describe("Testing Factory/candidatesFactory", () => {
  test("Test case: Is config", () => {
    expect(
      isConfig({
        rowsPerBand: 5,
        signatureLength: 100,
        shinglesType: "char",
        shinglesSize: 5,
      })
    ).toEqual(true);
  });

  test("Test case: Is not config", () => {
    expect(() =>
      isConfig({
        rowsPerBand: {},
        signatureLength: 100,
        shinglesType: "char",
        shinglesSize: 5,
      })
    ).toThrow(
      `Missing or incorrect 'rowsPerBand': it must be number equal or larger than 1.`
    );
  });

  const config: Config = {
    rowsPerBand: 5,
    signatureLength: 100,
    shinglesType: "char",
    shinglesSize: 5,
  };

  test("Test case: Is BaseCandidatesFinder", () => {
    const finder = makeCandidatesFinder(config);
    expect(finder).toBeInstanceOf(BaseCandidatesFinder);
  });

  const config2: Config = {
    rowsPerBand: 5,
    signatureLength: 100,
    shinglesType: "word",
    shinglesSize: 5,
  };

  test("Test case: Is BaseCandidatesFinder with WordShinglingTool", () => {
    const finder = makeCandidatesFinder(config2);
    expect(finder).toBeInstanceOf(BaseCandidatesFinder);
  });
});

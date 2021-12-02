import {
  isConfig,
  makeAsyncDuplicatesFinder,
  makeDuplicatesFinder,
  Config,
} from "../../../src/Factory/duplicatesFinderFactory";
import {
  BaseAsyncNearDuplicatesFinder,
  BaseNearDuplicatesFinder,
} from "../../../index";

describe("Testing Factory/duplicatesFactory", () => {
  test("Test case: Is config", () => {
    expect(
      isConfig({
        minSimilarity: 0.1,
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
        minSimilarity: -1,
        rowsPerBand: 5,
        signatureLength: 100,
        shinglesType: "char",
        shinglesSize: 5,
      })
    ).toThrow(
      `Missing or incorrect 'minSimilarity': it must be number between 0 and 1.`
    );
  });

  const config: Config = {
    minSimilarity: 0.1,
    rowsPerBand: 5,
    signatureLength: 100,
    shinglesType: "char",
    shinglesSize: 5,
  };

  test("Test case: Is Sync DuplicateFinder", () => {
    const finder = makeDuplicatesFinder(config);
    expect(finder).toBeInstanceOf(BaseNearDuplicatesFinder);
  });

  test("Test case: Is Async DuplicateFinder", () => {
    const finder = makeAsyncDuplicatesFinder(config);
    expect(finder).toBeInstanceOf(BaseAsyncNearDuplicatesFinder);
  });
});

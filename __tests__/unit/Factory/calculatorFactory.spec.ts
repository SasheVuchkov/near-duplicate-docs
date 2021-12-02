import { makeJaccartSimilarityCalculator } from "../../../src/Factory/calculatorFactory";
import JaccardSimilarityCalculator from "../../../src/SimilarityCalculator/JaccardSimilarityCalculator";

describe("Testing Factory/calculatorFactory", () => {
  test("Test case: Is JaccardSimilarityCalculator", () => {
    const finder = makeJaccartSimilarityCalculator();
    expect(finder).toBeInstanceOf(JaccardSimilarityCalculator);
  });
});

import JaccardSimilarityCalculator from "../SimilarityCalculator/JaccardSimilarityCalculator";

export const makeJaccartSimilarityCalculator = () => {
  return new JaccardSimilarityCalculator();
};

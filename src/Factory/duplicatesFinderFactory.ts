import {
  makeCandidatesFinder,
  makeCandidatesFinderWithMocks,
} from "./candidatesFinderFactory";
import NearDuplicatesFinder from "../NearDuplicatesFinder";
import JaccardSimilarityCalculator from "../SimilarityCalculator/JaccardSimilarityCalculator";

export const makeDuplicatesFinder = (config: {
  minSimilarity: number;
  shinglesSize: number;
  shinglesType: "char" | "word";
  signatureLength: number;
  rowsPerBand: number;
}) => {
  const candidatesFinder = makeCandidatesFinder({ ...config });

  return new NearDuplicatesFinder(
    { minSimilarity: config.minSimilarity },
    candidatesFinder,
    new JaccardSimilarityCalculator()
  );
};

export const makeDuplicatesFinderWithMocks = (config: {
  minSimilarity: number;
  shinglesSize: number;
  shinglesType: "char" | "word";
  signatureLength: number;
  rowsPerBand: number;
}) => {
  const candidatesFinder = makeCandidatesFinderWithMocks({ ...config });

  return new NearDuplicatesFinder(
    { minSimilarity: config.minSimilarity },
    candidatesFinder,
    new JaccardSimilarityCalculator()
  );
};

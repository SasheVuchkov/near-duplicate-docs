import {
  makeCandidatesFinder,
  makeCandidatesFinderWithMocks,
} from "./candidatesFinderFactory";
import BaseNearDuplicatesFinder from "../BaseNearDuplicatesFinder";
import JaccardSimilarityCalculator from "../SimilarityCalculator/JaccardSimilarityCalculator";
import AsyncNearDuplicatesFinder from "../AsyncNearDuplicatesFinder";

export type Config = {
  minSimilarity: number;
  shinglesSize: number;
  shinglesType: "char" | "word";
  signatureLength: number;
  rowsPerBand: number;
};

export const makeDuplicatesFinder = (config: Config) => {
  const candidatesFinder = makeCandidatesFinder({ ...config });

  return new BaseNearDuplicatesFinder(
    { minSimilarity: config.minSimilarity },
    candidatesFinder,
    new JaccardSimilarityCalculator()
  );
};

export const makeAsyncDuplicatesFinder = (config: Config) => {
  const candidatesFinder = makeCandidatesFinder({ ...config });

  return new AsyncNearDuplicatesFinder(
    { minSimilarity: config.minSimilarity },
    candidatesFinder,
    new JaccardSimilarityCalculator()
  );
};

export const makeDuplicatesFinderWithMocks = (config: Config) => {
  const candidatesFinder = makeCandidatesFinderWithMocks({ ...config });

  return new BaseNearDuplicatesFinder(
    { minSimilarity: config.minSimilarity },
    candidatesFinder,
    new JaccardSimilarityCalculator()
  );
};

import {
  makeCandidatesFinder,
  makeCandidatesFinderWithMocks,
} from "./candidatesFinderFactory";
import BaseNearDuplicatesFinder from "../BaseNearDuplicatesFinder";
import JaccardSimilarityCalculator from "../SimilarityCalculator/JaccardSimilarityCalculator";
import BaseAsyncNearDuplicatesFinder from "../BaseAsyncNearDuplicatesFinder";
import { makeNearDuplicateFinderConfigGuard } from "./guardFactory";

export type Config = {
  minSimilarity: number;
  shinglesSize: number;
  shinglesType: "char" | "word";
  signatureLength: number;
  rowsPerBand: number;
};

export const isConfig = (value: any): value is Config => {
  const guard = makeNearDuplicateFinderConfigGuard();

  if (!guard.isValid(value)) {
    throw new Error(guard.getMessage());
  }

  return true;
};

export const makeDuplicatesFinder = (config: Config) => {
  isConfig(config);
  const candidatesFinder = makeCandidatesFinder({ ...config });

  return new BaseNearDuplicatesFinder(
    { minSimilarity: config.minSimilarity },
    candidatesFinder,
    new JaccardSimilarityCalculator()
  );
};

export const makeAsyncDuplicatesFinder = (config: Config) => {
  isConfig(config);

  const candidatesFinder = makeCandidatesFinder({ ...config });

  return new BaseAsyncNearDuplicatesFinder(
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

export const makeAsyncDuplicatesFinderWithMocks = (config: Config) => {
  const candidatesFinder = makeCandidatesFinderWithMocks({ ...config });

  return new BaseAsyncNearDuplicatesFinder(
    { minSimilarity: config.minSimilarity },
    candidatesFinder,
    new JaccardSimilarityCalculator()
  );
};

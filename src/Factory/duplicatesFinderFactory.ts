import { makeCandidatesFinder } from "./candidatesFinderFactory";
import NearDuplicatesFinder from "../NearDuplicatesFinder";

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
    candidatesFinder
  );
};

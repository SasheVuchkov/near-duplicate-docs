import { makeDuplicatesFinder } from "./src/Factory/duplicatesFinderFactory";
import { makeCandidatesFinder } from "./src/Factory/candidatesFinderFactory";
import { makeJaccartSimilarityCalculator } from "./src/Factory/makeCalculator";
import { makeBaseSparseMatrix, makeSignatureMatrix } from "./src/Factory/matrixFactory";
import { makeWordShinglingTool, makeStringShinglingTool } from "./src/Factory/shinglingToolFactory";
export { makeDuplicatesFinder, makeCandidatesFinder, makeWordShinglingTool, makeStringShinglingTool, makeSignatureMatrix, makeBaseSparseMatrix, makeJaccartSimilarityCalculator, };

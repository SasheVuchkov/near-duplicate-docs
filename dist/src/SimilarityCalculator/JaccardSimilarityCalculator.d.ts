import SimilarityCalculator, { Scores } from "./SimilarityCalculator";
import { Shingle } from "../ShinglingTool/ShinglingTool";
import { Key } from "../ShinglingTool/SparseMatrix";
export default class JaccardSimilarityCalculator implements SimilarityCalculator {
    calculate(docIds: string[], shingles: {
        [docId: Key]: {
            [shingle: Shingle]: number;
        };
    }): Scores;
    protected compare(s1: {
        [shingle: Shingle]: number;
    }, s2: {
        [shingle: Shingle]: number;
    }): number;
}

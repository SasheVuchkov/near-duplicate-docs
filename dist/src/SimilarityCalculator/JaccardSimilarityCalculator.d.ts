import SimilarityCalculator, { Scores } from "./SimilarityCalculator";
import { Shingle } from "../ShinglingTool/ShinglingTool";
export default class JaccardSimilarityCalculator implements SimilarityCalculator {
    calculate(docIds: string[], shingles: {
        [docId: string]: [number, Shingle][];
    }): Scores;
    protected compare(s1: [number, Shingle][], s2: [number, Shingle][]): number;
}

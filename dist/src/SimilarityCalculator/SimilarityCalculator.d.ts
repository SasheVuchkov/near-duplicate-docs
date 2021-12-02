import { Shingle } from "../ShinglingTool/ShinglingTool";
import { Key } from "../ShinglingTool/SparseMatrix";
export declare type Scores = {
    [id: string]: [number, string][];
};
export default interface SimilarityCalculator {
    calculate(docIds: string[], shingles: {
        [docId: Key]: {
            [shingle: Shingle]: number;
        };
    }): Scores;
}

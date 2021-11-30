import { Shingle } from "../ShinglingTool/ShinglingTool";
export declare type Scores = {
    [id: string]: [number, string][];
};
export default interface SimilarityCalculator {
    calculate(docIds: string[], shingles: {
        [docId: string]: [number, Shingle][];
    }): Scores;
}

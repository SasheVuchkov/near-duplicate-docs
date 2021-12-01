import { Scores } from "./SimilarityCalculator/SimilarityCalculator";
import { AbstractNearDuplicatesFinder } from "./AbstractNearDuplicatesFinder";
export declare type Config = {
    minSimilarity: number;
};
export declare type Duplicates = Scores;
export default class AsyncNearDuplicatesFinder extends AbstractNearDuplicatesFinder {
    add(docId: string, text: string): Promise<void>;
    search(): Promise<Duplicates>;
}

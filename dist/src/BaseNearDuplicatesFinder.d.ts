import { Scores } from "./SimilarityCalculator/SimilarityCalculator";
import { AbstractNearDuplicatesFinder } from "./AbstractNearDuplicatesFinder";
export declare type Config = {
    minSimilarity: number;
};
export declare type Duplicates = Scores;
export default class BaseNearDuplicatesFinder extends AbstractNearDuplicatesFinder {
    add(docId: string, text: string): void;
    search(): Duplicates;
}

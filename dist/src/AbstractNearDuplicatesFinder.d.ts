/// <reference types="node" />
import CandidatesFinder from "./CandidatesFinder";
import SimilarityCalculator, { Scores } from "./SimilarityCalculator/SimilarityCalculator";
import { EventEmitter } from "events";
export declare type Config = {
    minSimilarity: number;
};
export declare type Duplicates = Scores;
export default abstract class AbstractNearDuplicatesFinder extends EventEmitter {
    protected config: Config;
    protected candidatesFinder: CandidatesFinder;
    protected similarityCalculator: SimilarityCalculator;
    constructor(config: Config, candidatesFinder: CandidatesFinder, similarityCalculator: SimilarityCalculator);
    protected process(candidates: string[][]): Scores;
}

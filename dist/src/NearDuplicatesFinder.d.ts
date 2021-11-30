/// <reference types="node" />
import { EventEmitter } from "events";
import SimilarityCalculator, { Scores } from "./SimilarityCalculator/SimilarityCalculator";
import CandidatesFinder from "./CandidatesFinder";
export declare type Config = {
    minSimilarity: number;
};
export declare type Duplicates = Scores;
export default class NearDuplicatesFinder extends EventEmitter {
    protected config: Config;
    protected candidatesFinder: CandidatesFinder;
    protected similarityCalculator: SimilarityCalculator;
    constructor(config: Config, candidatesFinder: CandidatesFinder, similarityCalculator: SimilarityCalculator);
    add: (docId: string, text: string) => void;
    search(): Duplicates;
    protected process(candidates: string[][]): Scores;
}

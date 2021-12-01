/// <reference types="node" />
import NearDuplicatesFinder from "./NearDuplicatesFinder";
import CandidatesFinder from "./CandidatesFinder";
import SimilarityCalculator, { Scores } from "./SimilarityCalculator/SimilarityCalculator";
import { Config, Duplicates } from "./BaseNearDuplicatesFinder";
import { EventEmitter } from "events";
export declare abstract class AbstractNearDuplicatesFinder extends EventEmitter implements NearDuplicatesFinder {
    protected config: Config;
    protected candidatesFinder: CandidatesFinder;
    protected similarityCalculator: SimilarityCalculator;
    abstract add(docId: string, text: string): void | Promise<void>;
    abstract search(): Duplicates | Promise<Duplicates>;
    constructor(config: Config, candidatesFinder: CandidatesFinder, similarityCalculator: SimilarityCalculator);
    protected process(candidates: string[][]): Scores;
}

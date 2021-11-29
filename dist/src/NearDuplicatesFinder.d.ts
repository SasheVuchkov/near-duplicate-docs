/// <reference types="node" />
import { EventEmitter } from "events";
import { Shingle } from "./ShinglingTool/ShinglingTool";
import CandidateDuplicatesFinder from "./CandidateDuplicatesFinder";
export declare type Config = {
    minSimilarity: number;
};
export declare type Duplicates = {
    [id: string]: [number, string][];
};
export default class NearDuplicatesFinder extends EventEmitter {
    protected duplicates: Duplicates;
    protected config: Config;
    protected errors: any[];
    protected candidatesFinder: CandidateDuplicatesFinder;
    constructor(config: Config, candidatesFinder: CandidateDuplicatesFinder);
    add: (docId: string, text: string) => void;
    search(): Duplicates;
    protected process(candidates: string[][]): Duplicates;
    protected compare(docIds: string[], shingles: {
        [docId: string]: [number, Shingle][];
    }): void;
    protected compareShingles(s1: [number, Shingle][], s2: [number, Shingle][]): number;
    hasErrors(): boolean;
    getErrors(): any[];
}

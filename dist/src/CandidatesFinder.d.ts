/// <reference types="node" />
import { EventEmitter } from "events";
import OffersShinglesByDoc from "./ShinglingTool/OffersShinglesByDoc";
import { Key } from "./ShinglingTool/SparseMatrix";
import { Shingle } from "./ShinglingTool/ShinglingTool";
export default abstract class CandidatesFinder extends EventEmitter implements OffersShinglesByDoc {
    abstract add(docId: string, text: string): void;
    abstract search(): string[][];
    abstract getDocShingles(docIds: Key[]): {
        [docId: Key]: {
            [shingle: Shingle]: number;
        };
    };
}

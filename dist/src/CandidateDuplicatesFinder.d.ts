/// <reference types="node" />
import { EventEmitter } from "events";
import SparseMatrix, { Key } from "./ShinglingTool/SparseMatrix";
import SignatureMatrix from "./ShinglingTool/SignatureMatrix";
import ShinglingTool, { Shingle } from "./ShinglingTool/ShinglingTool";
import HashRegister from "./Util/HashRegister";
export declare type Bucket = {
    [hash: string]: string[];
};
export declare type Config = {
    rowsPerBand: number;
};
export default class CandidateDuplicatesFinder extends EventEmitter {
    protected candidates: string[][];
    protected shinglesMatrix: SparseMatrix;
    protected signatureMatrix: SignatureMatrix;
    protected shinglingTool: ShinglingTool;
    protected config: Config;
    protected hashRegister: HashRegister;
    constructor(config: Config, shinglesMatrix: SparseMatrix, signatureMatrix: SignatureMatrix, shinglingTool: ShinglingTool);
    add: (docId: string, text: string) => void;
    getDocShingles(docIds: string[]): {
        [docId: Key]: [number, Shingle][];
    };
    search(): string[][];
    protected compress(bucket: Bucket): void;
    protected sort(docIds: string[], vectors: {
        [id: string]: number[];
    }): Bucket;
}

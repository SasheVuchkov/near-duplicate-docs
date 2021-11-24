/// <reference types="node" />
import { EventEmitter } from 'events';
import FilterInterface from "./Filter/FilterInterface";
import ShinglingTool from "./ShinglingTool/ShinglingTool";
import SparseMatrix from "./ShinglingTool/SparseMatrix";
import SignatureMatrix from "./ShinglingTool/SignatureMatrix";
import HashRegister from "./Util/HashRegister";
export declare type Bucket = {
    [hash: string]: string[];
};
export declare type Config = {
    rowsPerBand: number;
    minSimilarity: number;
};
export default class NearDuplicatesFinder extends EventEmitter {
    protected shinglesMatrix: SparseMatrix;
    protected signatureMatrix: SignatureMatrix;
    protected filter?: FilterInterface;
    protected shinglingTool: ShinglingTool;
    protected candidates: string[][];
    protected duplicates: {
        [id: string]: [number, string][];
    };
    protected config: Config;
    protected hashRegister: HashRegister;
    protected errors: any[];
    constructor(config: Config, shinglesMatrix: SparseMatrix, signatureMatrix: SignatureMatrix, shinglingTool: ShinglingTool, filter?: FilterInterface);
    add: (docId: string, text: string) => Promise<void>;
    start(): Promise<void>;
    findCandidates(docIds: string[], vectors: {
        [id: string]: number[];
    }): Promise<Bucket>;
    findDuplicates(candidates: string[][]): Promise<void>;
    compress(bucket: Bucket): void;
    compare(docIds: string[], shingles: {
        [docId: string]: (string | number)[];
    }): Promise<void>;
    protected compareShingles(s1: (string | number)[], s2: (string | number)[]): number;
    hasErrors(): boolean;
    getErrors(): any[];
}
export declare const makeFinder: (config: {
    minSimilarity: number;
    shinglesSize: number;
    shinglesType: 'char' | 'word';
    signatureLength: number;
    rowsPerBand: number;
}) => NearDuplicatesFinder;

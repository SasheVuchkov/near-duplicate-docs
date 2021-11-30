/// <reference types="node" />
import { EventEmitter } from "events";
import ShinglingTool, { Shingle } from "./ShinglingTool/ShinglingTool";
import SparseMatrix, { Key } from "./ShinglingTool/SparseMatrix";
import SignatureMatrix from "./ShinglingTool/SignatureMatrix";
import CandidatesFinder from "./CandidatesFinder";
import CandidatesBucket from "./Util/CandidatesBucket";
import OffersShinglesByDoc from "./ShinglingTool/OffersShinglesByDoc";
import FromSparseMatrix from "./ShinglingTool/FromSparseMatrix";
export declare type Config = {
    rowsPerBand: number;
};
export default class BaseCandidatesFinder extends EventEmitter implements CandidatesFinder {
    protected shinglesMatrix: SparseMatrix & OffersShinglesByDoc;
    protected signatureMatrix: SignatureMatrix & FromSparseMatrix<SignatureMatrix>;
    protected shinglingTool: ShinglingTool;
    protected config: Config;
    constructor(config: Config, shinglesMatrix: SparseMatrix & OffersShinglesByDoc, signatureMatrix: SignatureMatrix & FromSparseMatrix<SignatureMatrix>, shinglingTool: ShinglingTool);
    add: (docId: string, text: string) => void;
    getDocShingles(docIds: string[]): {
        [docId: Key]: [number, Shingle][];
    };
    search(): string[][];
    protected hash(docIds: string[], vectors: {
        [id: string]: number[];
    }, bucket: CandidatesBucket): CandidatesBucket;
}

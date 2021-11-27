import SparseMatrix from "./SparseMatrix";
import MergeSort from "../Util/MergeSort";
export declare type SignatureVector = {
    [salt: string]: number;
};
export declare type MatrixData = {
    [docId: string]: SignatureVector;
};
export default class SignatureMatrix {
    protected salts: number[];
    protected sigLength: number;
    protected hasher: (str: string) => number;
    protected matrix: SparseMatrix | undefined;
    protected sortAlgo: MergeSort<[string, number]>;
    constructor(sigLength: number);
    getSignatureLength(): number;
    getSignatureRows(): Generator<MatrixData>;
    fromSparseMatrix(matrix: SparseMatrix): SignatureMatrix;
    protected minHash(shuffledKeys: [string, number][], matrix: SparseMatrix, salt: string): MatrixData;
    protected shuffleKeys(keys: string[], salt: number): [string, number][];
    protected generateSalts(length: number): number[];
}

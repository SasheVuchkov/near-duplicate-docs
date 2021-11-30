import BaseSparseMatrix from "./BaseSparseMatrix";
import SignatureMatrix, { MatrixData } from "./SignatureMatrix";
import SortAlgo from "../Util/SortAlgo";
import FromSparseMatrix from "./FromSparseMatrix";
export default class BaseSignatureMatrix implements SignatureMatrix, FromSparseMatrix<SignatureMatrix> {
    protected salts: number[];
    protected sigLength: number;
    protected hasher: (str: string) => number;
    protected saltGenerator: () => number;
    protected matrix: BaseSparseMatrix | undefined;
    protected sortAlgo: SortAlgo<[string, number]>;
    constructor(sigLength: number, saltGenerator: () => number, sortAlgo: SortAlgo<[string, number]>);
    getSignatureLength(): number;
    getRows(): Generator<MatrixData>;
    fromSparseMatrix(matrix: BaseSparseMatrix): BaseSignatureMatrix;
    protected minHash(keys: [string, number][], matrix: BaseSparseMatrix, salt: string): MatrixData;
    protected shuffleKeys(keys: string[], salt: number): [string, number][];
    protected generateSalts(length: number): number[];
}
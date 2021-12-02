import BaseSparseMatrix from "./BaseSparseMatrix";
import SignatureMatrix, { MatrixData } from "./SignatureMatrix";
import SortAlgo from "../Util/SortAlgo";
import FromSparseMatrix from "./FromSparseMatrix";
export declare type Config = {
    sigLength: number;
};
/**
 * BaseSignatureMatrix generates the documents' signature vectors.
 *
 * It uses a generator function to generate a single point of these
 * vectors for all documents.
 */
export default class BaseSignatureMatrix implements SignatureMatrix, FromSparseMatrix<SignatureMatrix> {
    protected salts: number[];
    protected config: Config;
    protected hasher: (str: string) => number;
    protected saltGenerator: () => number;
    protected matrix: BaseSparseMatrix | undefined;
    protected sortAlgo: SortAlgo<[string, number]>;
    constructor(config: Config, saltGenerator: () => number, sortAlgo: SortAlgo<[string, number]>);
    getSignatureLength(): number;
    /**
     * A Generator for iterating over the signature vector's points.
     * The vectors are generated on the fly in a resource efficient way,
     * though the data is not saved and it's generated on every invocation
     */
    getRows(): Generator<MatrixData>;
    fromSparseMatrix(matrix: BaseSparseMatrix): BaseSignatureMatrix;
    /**
     * Minhash of a matrix means to reduced it to a single vector
     * which points are the smallest value of each matrix's column.
     *
     * @param keys
     * @param matrix
     * @param salt
     * @protected
     */
    protected minHash(keys: [string, number][], matrix: BaseSparseMatrix, salt: string): MatrixData;
    /**
     * Because we are betting on some probabilities,
     * we need to generate the minhashes buy using random
     * permutations of the SparseMatrix rows' order.
     *
     * This method emulates the process of creating permutations.
     *
     * @param keys
     * @param salt
     * @protected
     */
    protected shuffleKeys(keys: string[], salt: number): [string, number][];
    /**
     * We emulate new permutations by shifting the shingles
     * using the bits of a random numbers.
     *
     * @param length
     * @protected
     */
    protected generateSalts(length: number): number[];
}

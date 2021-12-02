import { Shingle } from "./ShinglingTool";
import SparseMatrix, { Key, Payload } from "./SparseMatrix";
import OffersShinglesByDoc from "./OffersShinglesByDoc";
/**
 * BaseSparseMatrix is used to hold documents' shingles. It holds the shingles of all
 * the documents that are passed for analyzes, thus representing a sparse matrix of
 * all possible shingles.
 *
 * Every row of the matrix holds the information of a single shingle, a.k.a every column
 * is a document where the shingle can be found.
 */
export default class BaseSparseMatrix implements SparseMatrix, OffersShinglesByDoc {
    /**
     * The key of the matrix row is a unique shingle, and the payload is an object which
     * keys are document ids, and the assigned values are the number of shingle occurrence
     * in the document.
     */
    protected rows: {
        [key: Key]: Payload;
    };
    getRows(): {
        [key: string]: Payload;
    };
    getPayload(key: Key): Payload | undefined;
    getShingles(): Key[];
    /**
     * The method sorts the shingles by documentId
     * @param docIds
     */
    getDocShingles(docIds: Key[]): {
        [docId: Key]: {
            [shingle: Shingle]: number;
        };
    };
    /**
     * Adds new row to the matrix
     *
     * @param key - the found shingle
     * @param payload - the id of the document that contains the shingle
     */
    addItem(key: Key, payload: string): SparseMatrix;
}

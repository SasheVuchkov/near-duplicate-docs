import { Shingle } from "./ShinglingTool";
import SparseMatrix, { Key, Payload } from "./SparseMatrix";
import OffersShinglesByDoc from "./OffersShinglesByDoc";
export default class BaseSparseMatrix implements SparseMatrix, OffersShinglesByDoc {
    protected rows: {
        [key: Key]: Payload;
    };
    getRows(): {
        [key: string]: Payload;
    };
    getPayload(key: Key): Payload | undefined;
    getShingles(): Key[];
    getDocShingles(docIds: Key[]): {
        [docId: Key]: {
            [shingle: Shingle]: number;
        };
    };
    addItem(key: Key, payload: string): SparseMatrix;
}

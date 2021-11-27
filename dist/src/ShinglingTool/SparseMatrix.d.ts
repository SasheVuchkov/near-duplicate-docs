import { Shingle } from "./ShinglingTool";
export declare type MatrixItem = [number, Payload];
export declare type Payload = number | string;
export declare type Key = string;
export default class SparseMatrix {
    protected rows: {
        [key: Key]: MatrixItem[];
    };
    getRows(): {
        [key: string]: MatrixItem[];
    };
    getPayload(key: Key): MatrixItem[] | undefined;
    getShingles(): Key[];
    getDocShingles(docIds: Key[]): {
        [docId: Key]: Shingle[];
    };
    addItem(key: Key, payload: Payload): SparseMatrix;
}

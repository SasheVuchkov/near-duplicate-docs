import { Shingle } from "./ShinglingTool";
export declare type MatrixItem = [number, Payload];
export declare type Payload = {
    [payload: string]: number;
};
export declare type Key = string;
export default class SparseMatrix {
    protected rows: {
        [key: Key]: Payload;
    };
    getRows(): {
        [key: string]: Payload;
    };
    getPayload(key: Key): Payload | undefined;
    getShingles(): Key[];
    getDocShingles(docIds: Key[]): {
        [docId: Key]: [number, Shingle][];
    };
    addItem(key: Key, payload: string): SparseMatrix;
}

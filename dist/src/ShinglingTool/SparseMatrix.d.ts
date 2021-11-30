export default interface SparseMatrix {
    getRows(): {
        [key: Key]: Payload;
    };
    getPayload(key: Key): Payload | undefined;
    getShingles(): Key[];
    addItem(key: Key, payload: string): SparseMatrix;
}
export declare type Payload = {
    [payload: string]: number;
};
export declare type Key = string;

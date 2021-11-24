export declare type MatrixItem = [number, number | string];
export default class SparseMatrix {
    protected rows: {
        [key: string]: MatrixItem[];
    };
    getRows(): {
        [key: string]: MatrixItem[];
    };
    getPayload(key: number | string): MatrixItem[] | undefined;
    getShingles(): (string | number)[];
    getDocShingles(docIds: string[]): {
        [docId: string]: (string | number)[];
    };
    addItem(key: number | string, payload: number | string): SparseMatrix;
    protected search(payload: string | number, rows: MatrixItem[]): MatrixItem | undefined;
}

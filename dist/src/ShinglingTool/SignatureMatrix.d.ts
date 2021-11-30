export default interface SignatureMatrix {
    getSignatureLength(): number;
    getRows(): Generator<MatrixData>;
}
export declare type SignatureVector = {
    [salt: string]: number;
};
export declare type MatrixData = {
    [docId: string]: SignatureVector;
};

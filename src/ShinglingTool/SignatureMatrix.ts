export default interface SignatureMatrix {
  getSignatureLength(): number;
  getRows(): Generator<MatrixData>;
}

export type SignatureVector = { [salt: string]: number };
export type MatrixData = { [docId: string]: SignatureVector };

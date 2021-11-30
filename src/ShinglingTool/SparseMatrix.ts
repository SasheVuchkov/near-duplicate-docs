export default interface SparseMatrix {
  getRows(): { [key: Key]: Payload };
  getPayload(key: Key): Payload | undefined;
  getShingles(): Key[];
  addItem(key: Key, payload: string): SparseMatrix;
}

export type Payload = { [payload: string]: number };
export type Key = string;

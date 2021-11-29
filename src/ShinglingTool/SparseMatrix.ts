import { Shingle } from "./ShinglingTool";

export type MatrixItem = [number, Payload];
export type Payload = { [payload: string]: number };
export type Key = string;

export default class SparseMatrix {
  protected rows: { [key: Key]: Payload } = {};

  public getRows() {
    return this.rows;
  }

  public getPayload(key: Key): Payload | undefined {
    return this.rows[key];
  }

  public getShingles(): Key[] {
    return Object.keys(this.rows);
  }

  public getDocShingles(docIds: Key[]): {
    [docId: Key]: [number, Shingle][];
  } {
    const shingles: { [docId: Key]: [number, Shingle][] } = {};

    for (const shingle in this.rows) {
      for (const id of docIds) {
        if (!shingles[id]) {
          shingles[id] = [];
        }
        if (this.rows[shingle][id]) {
          shingles[id].push([this.rows[shingle][id], shingle]);
        }
      }
    }
    return shingles;
  }

  public addItem(key: Key, payload: string): SparseMatrix {
    if (!this.rows[key]) {
      this.rows[key] = {};
    }
    if (!this.rows[key][payload]) {
      this.rows[key][payload] = 1;
      return this;
    }
    this.rows[key][payload] += 1;
    return this;
  }
}

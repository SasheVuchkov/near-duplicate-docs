import { Shingle } from "./ShinglingTool";
import SparseMatrix, { Key, Payload } from "./SparseMatrix";
import OffersShinglesByDoc from "./OffersShinglesByDoc";

export default class BaseSparseMatrix
  implements SparseMatrix, OffersShinglesByDoc
{
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
    [docId: Key]: { [shingle: Shingle]: number };
  } {
    const shingles: { [docId: Key]: { [shingle: Shingle]: number } } = {};

    for (const shingle in this.rows) {
      for (const id of docIds) {
        if (!shingles[id]) {
          shingles[id] = {};
        }
        if (this.rows[shingle][id]) {
          shingles[id][shingle] = this.rows[shingle][id];
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

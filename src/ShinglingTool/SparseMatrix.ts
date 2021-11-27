import { Shingle } from "./ShinglingTool";

export type MatrixItem = [number, Payload];
export type Payload = number | string;
export type Key = string;

export default class SparseMatrix {
  protected rows: { [key: Key]: MatrixItem[] } = {};

  public getRows() {
    return this.rows;
  }

  public getPayload(key: Key): MatrixItem[] | undefined {
    return this.rows[key];
  }

  public getShingles(): Key[] {
    return Object.keys(this.rows);
  }

  public getDocShingles(docIds: Key[]): {
    [docId: Key]: Shingle[];
  } {
    const shingles: { [docId: Key]: Shingle[] } = {};

    for (const shingle in this.rows) {
      for (const docId of docIds) {
        const docs = this.rows[shingle].filter((item) => docId === item[1]);
        if (docs.length > 0) {
          shingles[docId] = shingles[docId] ?? [];
          shingles[docId].push(shingle);
        }
      }
    }

    return shingles;
  }

  public addItem(key: Key, payload: Payload): SparseMatrix {
    if (!this.rows[key]) {
      this.rows[key] = [[1, payload]];
      return this;
    }

    this.rows[key].forEach((payload) => {
      payload[0] += 1;
    });

    return this;
  }
}

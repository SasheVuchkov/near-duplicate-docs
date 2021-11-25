export type MatrixItem = [number, number | string];

export default class SparseMatrix {
  protected rows: { [key: string]: MatrixItem[] } = {};

  public getRows() {
    return this.rows;
  }

  public getPayload(key: number | string): MatrixItem[] | undefined {
    return this.rows[key];
  }

  public getShingles(): (string | number)[] {
    return Object.keys(this.rows);
  }

  public getDocShingles(docIds: string[]): {
    [docId: string]: (string | number)[];
  } {
    const shingles: { [docId: string]: (string | number)[] } = {};

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

  public addItem(key: number | string, payload: number | string): SparseMatrix {
    if (!this.rows[key]) {
      this.rows[key] = [[1, payload]];
      return this;
    }

    this.rows[key] = this.rows[key].sort((a, b) => {
      if (a < b) {
        return -1;
      }

      if (a > b) {
        return 1;
      }

      return 0;
    });

    const found = this.search(payload, this.rows[key]);
    if (found && found[0]) {
      found[0] += 1;
      return this;
    }

    this.rows[key].push([1, payload]);
    return this;
  }

  protected search(
    payload: string | number,
    rows: MatrixItem[]
  ): MatrixItem | undefined {
    const index = Math.floor(rows.length / 2);
    const leftHalf = rows.slice(0, index);
    const lastItem = leftHalf.pop();

    if (!lastItem) {
      return;
    }

    if (lastItem && lastItem[1] < payload) {
      return this.search(payload, rows.slice(index));
    }

    if (lastItem && lastItem[1] > payload) {
      return this.search(payload, leftHalf);
    }

    return lastItem;
  }
}

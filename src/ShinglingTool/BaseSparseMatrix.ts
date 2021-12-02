import { Shingle } from "./ShinglingTool";
import SparseMatrix, { Key, Payload } from "./SparseMatrix";
import OffersShinglesByDoc from "./OffersShinglesByDoc";

/**
 * BaseSparseMatrix is used to hold documents' shingles. It holds the shingles of all
 * the documents that are passed for analyzes, thus representing a sparse matrix of
 * all possible shingles.
 *
 * Every row of the matrix holds the information of a single shingle, a.k.a every column
 * is a document where the shingle can be found.
 */
export default class BaseSparseMatrix
  implements SparseMatrix, OffersShinglesByDoc
{
  /**
   * The key of the matrix row is a unique shingle, and the payload is an object which
   * keys are document ids, and the assigned values are the number of shingle occurrence
   * in the document.
   */
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

  /**
   * The method sorts the shingles by documentId
   * @param docIds
   */
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

  /**
   * Adds new row to the matrix
   *
   * @param key - the found shingle
   * @param payload - the id of the document that contains the shingle
   */
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

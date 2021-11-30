import { Shingle } from "./ShinglingTool";
import { Key } from "./SparseMatrix";

export default interface OffersShinglesByDoc {
  getDocShingles(docIds: Key[]): { [docId: Key]: [number, Shingle][] };
}

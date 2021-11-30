import { EventEmitter } from "events";
import ShinglingTool, { Shingle } from "./ShinglingTool/ShinglingTool";
import SparseMatrix, { Key } from "./ShinglingTool/SparseMatrix";
import SignatureMatrix from "./ShinglingTool/SignatureMatrix";
import CandidatesFinder from "./CandidatesFinder";
import CandidatesBucket from "./Util/CandidatesBucket";
import OffersShinglesByDoc from "./ShinglingTool/OffersShinglesByDoc";
import FromSparseMatrix from "./ShinglingTool/FromSparseMatrix";

export type Config = { rowsPerBand: number };

export default class BaseCandidatesFinder
  extends EventEmitter
  implements CandidatesFinder
{
  protected shinglesMatrix: SparseMatrix & OffersShinglesByDoc;
  protected signatureMatrix: SignatureMatrix &
    FromSparseMatrix<SignatureMatrix>;
  protected shinglingTool: ShinglingTool;
  protected config: Config;

  public constructor(
    config: Config,
    shinglesMatrix: SparseMatrix & OffersShinglesByDoc,
    signatureMatrix: SignatureMatrix & FromSparseMatrix<SignatureMatrix>,
    shinglingTool: ShinglingTool
  ) {
    super();
    this.config = config;
    this.shinglesMatrix = shinglesMatrix;
    this.signatureMatrix = signatureMatrix;
    this.shinglingTool = shinglingTool;
  }

  public add = (docId: string, text: string): void => {
    this.shinglingTool.process(docId, text, (docId: string, shingle) => {
      this.shinglesMatrix.addItem(shingle.toString(), docId);
    });

    this.emit("doc_added", docId);
  };

  public getDocShingles(docIds: string[]): {
    [docId: Key]: [number, Shingle][];
  } {
    return this.shinglesMatrix.getDocShingles(docIds);
  }

  public search(): string[][] {
    this.emit("search");

    this.signatureMatrix.fromSparseMatrix(this.shinglesMatrix);
    const rows = this.signatureMatrix.getRows();
    const rowsPerBand = this.config.rowsPerBand;
    const currentVectors: { [id: string]: number[] }[] = [];
    const bucket: CandidatesBucket = new CandidatesBucket();
    let counter = 0;
    let bandKey = 0;

    let docIds: string[] = [];

    for (const row of rows) {
      counter += 1;

      if (!docIds.length) {
        docIds = Object.keys(row);
      }

      for (const docId of docIds) {
        const vectorPoint: number = Object.entries(row[docId])[0][1];

        if (!currentVectors[bandKey]) {
          currentVectors[bandKey] = {};
        }

        if (!currentVectors[bandKey][docId]) {
          currentVectors[bandKey][docId] = [];
        }

        currentVectors[bandKey][docId].push(vectorPoint);
      }

      if (
        counter < this.signatureMatrix.getSignatureLength() &&
        counter % rowsPerBand != 0
      ) {
        continue;
      }

      this.hash(docIds, currentVectors[bandKey], bucket);
      bandKey += 1;
    }

    const candidates = bucket.compress();
    this.emit("finish", candidates);
    return candidates;
  }

  protected hash(
    docIds: string[],
    vectors: { [id: string]: number[] },
    bucket: CandidatesBucket
  ): CandidatesBucket {
    for (const doc of docIds) {
      const hash = vectors[doc].join("");
      bucket.add(hash, doc);
    }

    return bucket;
  }
}

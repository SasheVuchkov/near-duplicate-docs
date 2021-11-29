import { EventEmitter } from "events";
import SparseMatrix, { Key } from "./ShinglingTool/SparseMatrix";
import SignatureMatrix from "./ShinglingTool/SignatureMatrix";
import ShinglingTool, { Shingle } from "./ShinglingTool/ShinglingTool";
import HashRegister from "./Util/HashRegister";

export type Bucket = { [hash: string]: string[] };
export type Config = { rowsPerBand: number };

export default class CandidateDuplicatesFinder extends EventEmitter {
  protected candidates: string[][] = [];
  protected shinglesMatrix: SparseMatrix;
  protected signatureMatrix: SignatureMatrix;
  protected shinglingTool: ShinglingTool;
  protected config: Config;
  protected hashRegister: HashRegister = new HashRegister("md5");

  public constructor(
    config: Config,
    shinglesMatrix: SparseMatrix,
    signatureMatrix: SignatureMatrix,
    shinglingTool: ShinglingTool
  ) {
    super();

    (this.config = config), (this.shinglesMatrix = shinglesMatrix);
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

  public search() {
    this.emit("search");

    this.signatureMatrix.fromSparseMatrix(this.shinglesMatrix);

    const rows = this.signatureMatrix.getSignatureRows();
    const rowsPerBand = this.config.rowsPerBand;
    const currentVectors: { [id: string]: number[] }[] = [];
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

      const bucket = this.sort([...docIds], currentVectors[bandKey]);
      this.compress(bucket);
      bandKey += 1;
    }

    this.emit("finish", this.candidates);
    return this.candidates;
  }

  protected compress(bucket: Bucket): void {
    for (const hash in bucket) {
      if (
        bucket[hash].length > 1 &&
        !this.hashRegister.check(bucket[hash].join(""))
      ) {
        this.candidates.push(bucket[hash]);
        this.emit("found_candidates", bucket[hash]);
      }
    }
  }

  protected sort(
    docIds: string[],
    vectors: { [id: string]: number[] }
  ): Bucket {
    const bucket: Bucket = {};
    for (const doc of docIds) {
      const hash = vectors[doc].join("");
      if (!bucket[hash]) {
        bucket[hash] = [];
      }

      bucket[hash].push(doc);
    }

    return bucket;
  }
}

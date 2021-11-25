import SparseMatrix from "./SparseMatrix";
import { getCompactHasher } from "../Factory/hasherFactory";
import MergeSort from "../Util/MergeSort";

export type SignatureVector = { [salt: string]: number };
export type MatrixData = { [docId: string]: SignatureVector };

export default class SignatureMatrix {
  protected salts: number[];
  protected sigLength: number;
  protected hasher: (str: string) => number;
  protected matrix: SparseMatrix | undefined;
  protected sortAlgo: MergeSort<[number | string, number]> = new MergeSort<
    [number | string, number]
  >(
    (
      left: [number | string, number],
      right: [number | string, number]
    ): boolean => left[1] < right[1]
  );

  public constructor(sigLength: number) {
    this.salts = this.generateSalts(sigLength);
    this.sigLength = sigLength;
    this.hasher = getCompactHasher();
  }

  public getSignatureLength(): number {
    return this.sigLength;
  }

  public *getSignatureRows(): Generator<MatrixData> {
    if (!this.matrix) {
      return;
    }

    const keys = this.matrix.getShingles();

    for (const salt of this.salts) {
      const shuffledKeys = this.shuffleKeys(keys, salt);
      yield this.minHash(shuffledKeys, this.matrix, salt.toString());
    }
  }

  public fromSparseMatrix(matrix: SparseMatrix): SignatureMatrix {
    this.matrix = matrix;
    return this;
  }

  protected minHash(
    shuffledKeys: [string | number, number][],
    matrix: SparseMatrix,
    salt: string
  ): MatrixData {
    const localRows: MatrixData = {};

    shuffledKeys?.forEach((key) => {
      const payload = matrix.getPayload(key[0]);

      payload?.forEach((item) => {
        if (typeof localRows[item[1]] === "undefined") {
          localRows[item[1]] = {};
        }

        const min = localRows[item[1]][salt];

        if (typeof min === "undefined") {
          localRows[item[1]][salt] = key[1];
          return;
        }

        localRows[item[1]][salt] = min > key[1] ? key[1] : min;
      });
    });

    return localRows;
  }

  protected shuffleKeys(
    keys: (string | number)[],
    salt: number
  ): [number | string, number][] {
    const result: [number | string, number][] = [];
    keys.forEach((key) => {
      const integer: number = typeof key === "string" ? this.hasher(key) : key;
      result.push([key, integer ^ salt]);
    });

    return this.sortAlgo.sort(result);
  }

  protected generateSalts(length: number): number[] {
    const salts: number[] = [];
    while (salts.length < length) {
      salts.push(Math.floor(Math.random() * 99999999));
    }
    return salts;
  }
}

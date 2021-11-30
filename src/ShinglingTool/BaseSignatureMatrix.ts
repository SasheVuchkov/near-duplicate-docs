import BaseSparseMatrix from "./BaseSparseMatrix";
import { getCompactHasher } from "../Factory/hasherFactory";
import SignatureMatrix, { MatrixData } from "./SignatureMatrix";
import SortAlgo from "../Util/SortAlgo";
import FromSparseMatrix from "./FromSparseMatrix";

export default class BaseSignatureMatrix
  implements SignatureMatrix, FromSparseMatrix<SignatureMatrix>
{
  protected salts: number[];
  protected sigLength: number;
  protected hasher: (str: string) => number;
  protected saltGenerator: () => number;
  protected matrix: BaseSparseMatrix | undefined;
  protected sortAlgo: SortAlgo<[string, number]>;

  public constructor(
    sigLength: number,
    saltGenerator: () => number,
    sortAlgo: SortAlgo<[string, number]>
  ) {
    this.saltGenerator = saltGenerator;
    this.salts = this.generateSalts(sigLength);
    this.sigLength = sigLength;
    this.hasher = getCompactHasher();
    this.sortAlgo = sortAlgo;
  }

  public getSignatureLength(): number {
    return this.sigLength;
  }

  public *getRows(): Generator<MatrixData> {
    if (!this.matrix) {
      return;
    }

    const keys = this.matrix.getShingles();

    for (const salt of this.salts) {
      const shuffledKeys = this.shuffleKeys(keys, salt);
      yield this.minHash(shuffledKeys, this.matrix, salt.toString());
    }
  }

  public fromSparseMatrix(matrix: BaseSparseMatrix): BaseSignatureMatrix {
    this.matrix = matrix;
    return this;
  }

  protected minHash(
    keys: [string, number][],
    matrix: BaseSparseMatrix,
    salt: string
  ): MatrixData {
    const localRows: MatrixData = {};
    keys?.forEach((key) => {
      const payload = matrix.getPayload(key[0]);

      if (!payload) {
        return;
      }
      Object.keys(payload).forEach((id) => {
        if (typeof localRows[id] === "undefined") {
          localRows[id] = {};
        }
        const min = localRows[id][salt];

        if (typeof min === "undefined") {
          localRows[id][salt] = key[1];
          return;
        }

        localRows[id][salt] = min > key[1] ? key[1] : min;
      });
    });

    return localRows;
  }

  protected shuffleKeys(keys: string[], salt: number): [string, number][] {
    const result: [string, number][] = [];
    keys.forEach((key) => {
      const integer: number = new Number(key).valueOf();
      result.push([
        key,
        (Number.isNaN(integer) ? this.hasher(key) : integer) ^ salt,
      ]);
    });
    return this.sortAlgo.sort(result);
  }

  protected generateSalts(length: number): number[] {
    const salts: number[] = [];
    while (salts.length < length) {
      const salt = this.saltGenerator();
      salts.push(salt);
    }
    return salts;
  }
}

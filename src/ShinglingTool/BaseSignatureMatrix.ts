import BaseSparseMatrix from "./BaseSparseMatrix";
import { getCompactHasher } from "../Factory/hasherFactory";
import SignatureMatrix, { MatrixData } from "./SignatureMatrix";
import SortAlgo from "../Util/SortAlgo";
import FromSparseMatrix from "./FromSparseMatrix";

export type Config = {
  sigLength: number;
};

/**
 * BaseSignatureMatrix generates the documents' signature vectors.
 *
 * It uses a generator function to generate a single point of these
 * vectors for all documents.
 */
export default class BaseSignatureMatrix
  implements SignatureMatrix, FromSparseMatrix<SignatureMatrix>
{
  protected salts: number[];
  protected config: Config;
  protected hasher: (str: string) => number;
  protected saltGenerator: () => number;
  protected matrix: BaseSparseMatrix | undefined;
  protected sortAlgo: SortAlgo<[string, number]>;

  public constructor(
    config: Config,
    saltGenerator: () => number,
    sortAlgo: SortAlgo<[string, number]>
  ) {
    this.config = config;
    this.saltGenerator = saltGenerator;
    this.salts = this.generateSalts(this.config.sigLength);
    this.hasher = getCompactHasher();
    this.sortAlgo = sortAlgo;
  }

  public getSignatureLength(): number {
    return this.config.sigLength;
  }

  /**
   * A Generator for iterating over the signature vector's points.
   * The vectors are generated on the fly in a resource efficient way,
   * though the data is not saved and it's generated on every invocation
   */
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

  /**
   * Minhash of a matrix means to reduced it to a single vector
   * which points are the smallest value of each matrix's column.
   *
   * @param keys
   * @param matrix
   * @param salt
   * @protected
   */
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

  /**
   * Because we are betting on some probabilities,
   * we need to generate the minhashes buy using random
   * permutations of the SparseMatrix rows' order.
   *
   * This method emulates the process of creating permutations.
   *
   * @param keys
   * @param salt
   * @protected
   */

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

  /**
   * We emulate new permutations by shifting the shingles
   * using the bits of a random numbers.
   *
   * @param length
   * @protected
   */
  protected generateSalts(length: number): number[] {
    const salts: number[] = [];
    while (salts.length < length) {
      const salt = this.saltGenerator();
      salts.push(salt);
    }
    return salts;
  }
}

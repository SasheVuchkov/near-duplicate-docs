"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hasherFactory_1 = require("../Factory/hasherFactory");
/**
 * BaseSignatureMatrix generates the documents' signature vectors.
 *
 * It uses a generator function to generate a single point of these
 * vectors for all documents.
 */
class BaseSignatureMatrix {
    constructor(config, saltGenerator, sortAlgo) {
        this.config = config;
        this.saltGenerator = saltGenerator;
        this.salts = this.generateSalts(this.config.sigLength);
        this.hasher = (0, hasherFactory_1.getCompactHasher)();
        this.sortAlgo = sortAlgo;
    }
    getSignatureLength() {
        return this.config.sigLength;
    }
    /**
     * A Generator for iterating over the signature vector's points.
     * The vectors are generated on the fly in a resource efficient way,
     * though the data is not saved and it's generated on every invocation
     */
    *getRows() {
        if (!this.matrix) {
            return;
        }
        const keys = this.matrix.getShingles();
        for (const salt of this.salts) {
            const shuffledKeys = this.shuffleKeys(keys, salt);
            yield this.minHash(shuffledKeys, this.matrix, salt.toString());
        }
    }
    fromSparseMatrix(matrix) {
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
    minHash(keys, matrix, salt) {
        const localRows = {};
        keys === null || keys === void 0 ? void 0 : keys.forEach((key) => {
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
    shuffleKeys(keys, salt) {
        const result = [];
        keys.forEach((key) => {
            const integer = new Number(key).valueOf();
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
    generateSalts(length) {
        const salts = [];
        while (salts.length < length) {
            const salt = this.saltGenerator();
            salts.push(salt);
        }
        return salts;
    }
}
exports.default = BaseSignatureMatrix;
//# sourceMappingURL=BaseSignatureMatrix.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hasherFactory_1 = require("../Factory/hasherFactory");
const MergeSort_1 = __importDefault(require("../Util/MergeSort"));
class SignatureMatrix {
    constructor(sigLength, saltGenerator) {
        this.sortAlgo = new MergeSort_1.default((left, right) => left[1] < right[1]);
        this.saltGenerator = saltGenerator;
        this.salts = this.generateSalts(sigLength);
        this.sigLength = sigLength;
        this.hasher = (0, hasherFactory_1.getCompactHasher)();
    }
    getSignatureLength() {
        return this.sigLength;
    }
    *getSignatureRows() {
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
    generateSalts(length) {
        const salts = [];
        while (salts.length < length) {
            const salt = this.saltGenerator();
            salts.push(salt);
        }
        return salts;
    }
}
exports.default = SignatureMatrix;
//# sourceMappingURL=SignatureMatrix.js.map
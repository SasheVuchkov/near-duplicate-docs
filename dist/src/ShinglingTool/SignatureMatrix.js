"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hasherFactory_1 = require("../Factory/hasherFactory");
const MergeSort_1 = __importDefault(require("../Util/MergeSort"));
class SignatureMatrix {
    constructor(sigLength) {
        this.rows = {};
        this.sortAlgo = new MergeSort_1.default((left, right) => left[1] < right[1]);
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
    minHash(shuffledKeys, matrix, salt) {
        const localRows = {};
        shuffledKeys === null || shuffledKeys === void 0 ? void 0 : shuffledKeys.forEach(key => {
            const payload = matrix.getPayload(key[0]);
            payload === null || payload === void 0 ? void 0 : payload.forEach(item => {
                if (typeof this.rows[item[1]] === 'undefined') {
                    this.rows[item[1]] = {};
                }
                if (typeof localRows[item[1]] === 'undefined') {
                    localRows[item[1]] = {};
                }
                const min = this.rows[item[1]][salt];
                const min2 = localRows[item[1]][salt];
                if (typeof min === 'undefined') {
                    this.rows[item[1]][salt] = key[1];
                    localRows[item[1]][salt] = key[1];
                    return;
                }
                this.rows[item[1]][salt] = min > key[1] ? key[1] : min;
                localRows[item[1]][salt] = min > key[1] ? key[1] : min;
            });
        });
        return localRows;
    }
    shuffleKeys(keys, salt) {
        const result = [];
        keys.forEach(key => {
            const integer = typeof key === 'string' ? this.hasher(key) : key;
            result.push([key, integer ^ salt]);
        });
        return this.sortAlgo.sort(result);
    }
    generateSalts(length) {
        const salts = [];
        while (salts.length < length) {
            salts.push(Math.floor(Math.random() * 99999999));
        }
        return salts;
    }
    addItem(key, salt, payload) {
        if (!this.rows[key]) {
            this.rows[key][salt] = payload;
            return this;
        }
        this.rows[key][salt] = payload;
        return this;
    }
    setItems(key, payload) {
        this.rows[key] = payload;
        return this;
    }
}
exports.default = SignatureMatrix;
//# sourceMappingURL=SignatureMatrix.js.map
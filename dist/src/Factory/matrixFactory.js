"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignatureMatrix = exports.makeBaseSparseMatrix = void 0;
const BaseSparseMatrix_1 = __importDefault(require("../ShinglingTool/BaseSparseMatrix"));
const BaseSignatureMatrix_1 = __importDefault(require("../ShinglingTool/BaseSignatureMatrix"));
const sortAlgoFactory_1 = require("./sortAlgoFactory");
const SaltGenerator_1 = __importDefault(require("../Util/SaltGenerator"));
const makeBaseSparseMatrix = () => {
    return new BaseSparseMatrix_1.default();
};
exports.makeBaseSparseMatrix = makeBaseSparseMatrix;
const makeSignatureMatrix = (sigLength) => {
    return new BaseSignatureMatrix_1.default({ sigLength }, SaltGenerator_1.default, (0, sortAlgoFactory_1.makeMergeSortAlgo)());
};
exports.makeSignatureMatrix = makeSignatureMatrix;
//# sourceMappingURL=matrixFactory.js.map
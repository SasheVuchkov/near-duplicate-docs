"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCandidatesFinder = void 0;
const StringShinglingTool_1 = __importDefault(require("../ShinglingTool/StringShinglingTool"));
const hasherFactory_1 = require("./hasherFactory");
const WordShinglingTool_1 = __importDefault(require("../ShinglingTool/WordShinglingTool"));
const BaseSparseMatrix_1 = __importDefault(require("../ShinglingTool/BaseSparseMatrix"));
const BaseSignatureMatrix_1 = __importDefault(require("../ShinglingTool/BaseSignatureMatrix"));
const SaltGenerator_1 = __importDefault(require("../Util/SaltGenerator"));
const BaseCandidatesFinder_1 = __importDefault(require("../BaseCandidatesFinder"));
const sortAlgoFactory_1 = require("./sortAlgoFactory");
const makeCandidatesFinder = (config) => {
    let shingleTool;
    if (config.shinglesType === "char") {
        shingleTool = new StringShinglingTool_1.default(config.shinglesSize, (0, hasherFactory_1.getCompactHasher)());
    }
    else {
        shingleTool = new WordShinglingTool_1.default(config.shinglesSize, (0, hasherFactory_1.getCompactHasher)());
    }
    return new BaseCandidatesFinder_1.default({ rowsPerBand: config.rowsPerBand }, new BaseSparseMatrix_1.default(), new BaseSignatureMatrix_1.default({ sigLength: config.signatureLength }, SaltGenerator_1.default, (0, sortAlgoFactory_1.makeMergeSortAlgo)()), shingleTool);
};
exports.makeCandidatesFinder = makeCandidatesFinder;
//# sourceMappingURL=candidatesFinderFactory.js.map
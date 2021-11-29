"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCandidatesFinder = void 0;
const StringShinglingTool_1 = __importDefault(require("../ShinglingTool/StringShinglingTool"));
const hasherFactory_1 = require("./hasherFactory");
const filterFactory_1 = require("./filterFactory");
const WordShinglingTool_1 = __importDefault(require("../ShinglingTool/WordShinglingTool"));
const SparseMatrix_1 = __importDefault(require("../ShinglingTool/SparseMatrix"));
const SignatureMatrix_1 = __importDefault(require("../ShinglingTool/SignatureMatrix"));
const SaltGenerator_1 = __importDefault(require("../Util/SaltGenerator"));
const CandidateDuplicatesFinder_1 = __importDefault(require("../CandidateDuplicatesFinder"));
const makeCandidatesFinder = (config) => {
    let shingleTool;
    if (config.shinglesType === "char") {
        shingleTool = new StringShinglingTool_1.default(config.shinglesSize, (0, hasherFactory_1.getCompactHasher)(), (0, filterFactory_1.baseFilterFactory)());
    }
    else {
        shingleTool = new WordShinglingTool_1.default(config.shinglesSize, (0, hasherFactory_1.getCompactHasher)(), (0, filterFactory_1.baseFilterFactory)());
    }
    return new CandidateDuplicatesFinder_1.default({ rowsPerBand: config.rowsPerBand }, new SparseMatrix_1.default(), new SignatureMatrix_1.default(config.signatureLength, SaltGenerator_1.default), shingleTool);
};
exports.makeCandidatesFinder = makeCandidatesFinder;
//# sourceMappingURL=candidatesFinderFactory.js.map
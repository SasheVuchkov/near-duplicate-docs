"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCandidatesFinderWithMocks = exports.makeCandidatesFinder = void 0;
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
const makeCandidatesFinderWithMocks = (config) => {
    let shingleTool;
    if (config.shinglesType === "char") {
        shingleTool = new StringShinglingTool_1.default(config.shinglesSize, (0, hasherFactory_1.getCompactHasher)());
    }
    else {
        shingleTool = new WordShinglingTool_1.default(config.shinglesSize, (0, hasherFactory_1.getCompactHasher)());
    }
    let count = 0;
    const salts = [
        4234234, 6574568, 537547, 5326326, 632654276, 5363467, 626545235, 58937259,
        248293084293, 2983940283940, 953450948590, 94820938, 29384098, 53485798,
        98768768, 925809283509, 4238503405, 21312098, 21312344589567,
        4323982093752930, 2934219054781, 358237498273, 589903485, 9482093842,
        34908239084, 543057893408590, 29580293580, 293058293057, 29835279,
        293084230984, 903583409875892, 5483402938234, 3435345345809, 87897354423749,
        479857893457,
    ];
    const mockSaltGenerator = () => {
        if (count > salts.length - 1) {
            count = 0;
        }
        return salts[count++];
    };
    return new BaseCandidatesFinder_1.default({ rowsPerBand: config.rowsPerBand }, new BaseSparseMatrix_1.default(), new BaseSignatureMatrix_1.default({ sigLength: config.signatureLength }, mockSaltGenerator, (0, sortAlgoFactory_1.makeMergeSortAlgo)()), shingleTool);
};
exports.makeCandidatesFinderWithMocks = makeCandidatesFinderWithMocks;
//# sourceMappingURL=candidatesFinderFactory.js.map
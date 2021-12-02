"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidatesFinder = exports.AbstractNearDuplicatesFinder = exports.BaseAsyncNearDuplicatesFinder = exports.BaseNearDuplicatesFinder = exports.BaseCandidatesFinder = exports.saltGenerator = exports.MergeSort = exports.CandidatesBucket = exports.JaccardSimilarityCalculato = exports.StringShinglingTool = exports.WordShinglingTool = exports.BaseSignatureMatrix = exports.BaseSparseMatrix = exports.makeMergeSortAlgo = exports.getCompactHasher = exports.makeStringShinglingTool = exports.makeWordShinglingTool = exports.makeSignatureMatrix = exports.makeBaseSparseMatrix = exports.makeJaccartSimilarityCalculator = exports.makeCandidatesFinder = exports.makeDuplicatesFinder = exports.makeAsyncDuplicatesFinder = void 0;
const duplicatesFinderFactory_1 = require("./src/Factory/duplicatesFinderFactory");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readline_1 = __importDefault(require("readline"));
var duplicatesFinderFactory_2 = require("./src/Factory/duplicatesFinderFactory");
Object.defineProperty(exports, "makeAsyncDuplicatesFinder", { enumerable: true, get: function () { return duplicatesFinderFactory_2.makeAsyncDuplicatesFinder; } });
Object.defineProperty(exports, "makeDuplicatesFinder", { enumerable: true, get: function () { return duplicatesFinderFactory_2.makeDuplicatesFinder; } });
var candidatesFinderFactory_1 = require("./src/Factory/candidatesFinderFactory");
Object.defineProperty(exports, "makeCandidatesFinder", { enumerable: true, get: function () { return candidatesFinderFactory_1.makeCandidatesFinder; } });
var calculatorFactory_1 = require("./src/Factory/calculatorFactory");
Object.defineProperty(exports, "makeJaccartSimilarityCalculator", { enumerable: true, get: function () { return calculatorFactory_1.makeJaccartSimilarityCalculator; } });
var matrixFactory_1 = require("./src/Factory/matrixFactory");
Object.defineProperty(exports, "makeBaseSparseMatrix", { enumerable: true, get: function () { return matrixFactory_1.makeBaseSparseMatrix; } });
Object.defineProperty(exports, "makeSignatureMatrix", { enumerable: true, get: function () { return matrixFactory_1.makeSignatureMatrix; } });
var shinglingToolFactory_1 = require("./src/Factory/shinglingToolFactory");
Object.defineProperty(exports, "makeWordShinglingTool", { enumerable: true, get: function () { return shinglingToolFactory_1.makeWordShinglingTool; } });
Object.defineProperty(exports, "makeStringShinglingTool", { enumerable: true, get: function () { return shinglingToolFactory_1.makeStringShinglingTool; } });
var hasherFactory_1 = require("./src/Factory/hasherFactory");
Object.defineProperty(exports, "getCompactHasher", { enumerable: true, get: function () { return hasherFactory_1.getCompactHasher; } });
var sortAlgoFactory_1 = require("./src/Factory/sortAlgoFactory");
Object.defineProperty(exports, "makeMergeSortAlgo", { enumerable: true, get: function () { return sortAlgoFactory_1.makeMergeSortAlgo; } });
var BaseSparseMatrix_1 = require("./src/ShinglingTool/BaseSparseMatrix");
Object.defineProperty(exports, "BaseSparseMatrix", { enumerable: true, get: function () { return __importDefault(BaseSparseMatrix_1).default; } });
var BaseSignatureMatrix_1 = require("./src/ShinglingTool/BaseSignatureMatrix");
Object.defineProperty(exports, "BaseSignatureMatrix", { enumerable: true, get: function () { return __importDefault(BaseSignatureMatrix_1).default; } });
var WordShinglingTool_1 = require("./src/ShinglingTool/WordShinglingTool");
Object.defineProperty(exports, "WordShinglingTool", { enumerable: true, get: function () { return __importDefault(WordShinglingTool_1).default; } });
var StringShinglingTool_1 = require("./src/ShinglingTool/StringShinglingTool");
Object.defineProperty(exports, "StringShinglingTool", { enumerable: true, get: function () { return __importDefault(StringShinglingTool_1).default; } });
var JaccardSimilarityCalculator_1 = require("./src/SimilarityCalculator/JaccardSimilarityCalculator");
Object.defineProperty(exports, "JaccardSimilarityCalculato", { enumerable: true, get: function () { return __importDefault(JaccardSimilarityCalculator_1).default; } });
var CandidatesBucket_1 = require("./src/Util/CandidatesBucket");
Object.defineProperty(exports, "CandidatesBucket", { enumerable: true, get: function () { return __importDefault(CandidatesBucket_1).default; } });
var MergeSort_1 = require("./src/Util/MergeSort");
Object.defineProperty(exports, "MergeSort", { enumerable: true, get: function () { return __importDefault(MergeSort_1).default; } });
var SaltGenerator_1 = require("./src/Util/SaltGenerator");
Object.defineProperty(exports, "saltGenerator", { enumerable: true, get: function () { return __importDefault(SaltGenerator_1).default; } });
var BaseCandidatesFinder_1 = require("./src/BaseCandidatesFinder");
Object.defineProperty(exports, "BaseCandidatesFinder", { enumerable: true, get: function () { return __importDefault(BaseCandidatesFinder_1).default; } });
var BaseNearDuplicatesFinder_1 = require("./src/BaseNearDuplicatesFinder");
Object.defineProperty(exports, "BaseNearDuplicatesFinder", { enumerable: true, get: function () { return __importDefault(BaseNearDuplicatesFinder_1).default; } });
var BaseAsyncNearDuplicatesFinder_1 = require("./src/BaseAsyncNearDuplicatesFinder");
Object.defineProperty(exports, "BaseAsyncNearDuplicatesFinder", { enumerable: true, get: function () { return __importDefault(BaseAsyncNearDuplicatesFinder_1).default; } });
var AbstractNearDuplicatesFinder_1 = require("./src/AbstractNearDuplicatesFinder");
Object.defineProperty(exports, "AbstractNearDuplicatesFinder", { enumerable: true, get: function () { return __importDefault(AbstractNearDuplicatesFinder_1).default; } });
var CandidatesFinder_1 = require("./src/CandidatesFinder");
Object.defineProperty(exports, "CandidatesFinder", { enumerable: true, get: function () { return __importDefault(CandidatesFinder_1).default; } });
function process2() {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        const finder = (0, duplicatesFinderFactory_1.makeAsyncDuplicatesFinder)({
            minSimilarity: 0.01,
            shinglesSize: 5,
            shinglesType: "word",
            signatureLength: 100,
            rowsPerBand: 5,
        });
        const fileStream = fs_1.default.createReadStream(path_1.default.join(__dirname, "..", "datasets", "reviews.test.txt"));
        const rl = readline_1.default.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        let count = 0;
        const promises = [];
        try {
            for (var rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = yield rl_1.next(), !rl_1_1.done;) {
                const line = rl_1_1.value;
                const promise = finder.add(`review${count}`, line);
                promises.push(promise);
                count += 1;
                if (count > 10001) {
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (rl_1_1 && !rl_1_1.done && (_a = rl_1.return)) yield _a.call(rl_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        Promise.all(promises)
            .then(() => finder.search())
            .then((duplicates) => {
            console.log(duplicates);
        })
            .catch((error) => console.log(error));
    });
}
void process2();
function processSync() {
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function* () {
        const finder = (0, duplicatesFinderFactory_1.makeDuplicatesFinder)({
            minSimilarity: 0.01,
            shinglesSize: 5,
            shinglesType: "word",
            signatureLength: 100,
            rowsPerBand: 5,
        });
        const fileStream = fs_1.default.createReadStream(path_1.default.join(__dirname, "..", "datasets", "reviews.test.txt"));
        const rl = readline_1.default.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        let count = 0;
        const promises = [];
        try {
            for (var rl_2 = __asyncValues(rl), rl_2_1; rl_2_1 = yield rl_2.next(), !rl_2_1.done;) {
                const line = rl_2_1.value;
                finder.add(`review${count}`, line);
                count += 1;
                if (count > 10001) {
                    break;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (rl_2_1 && !rl_2_1.done && (_a = rl_2.return)) yield _a.call(rl_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        const duplicates = finder.search();
        console.log(duplicates);
    });
}
//void processSync();
//# sourceMappingURL=index.js.map
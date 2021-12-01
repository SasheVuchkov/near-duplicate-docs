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
exports.makeJaccartSimilarityCalculator = exports.makeBaseSparseMatrix = exports.makeSignatureMatrix = exports.makeStringShinglingTool = exports.makeWordShinglingTool = exports.makeCandidatesFinder = exports.makeDuplicatesFinder = void 0;
const duplicatesFinderFactory_1 = require("./src/Factory/duplicatesFinderFactory");
Object.defineProperty(exports, "makeDuplicatesFinder", { enumerable: true, get: function () { return duplicatesFinderFactory_1.makeDuplicatesFinder; } });
const candidatesFinderFactory_1 = require("./src/Factory/candidatesFinderFactory");
Object.defineProperty(exports, "makeCandidatesFinder", { enumerable: true, get: function () { return candidatesFinderFactory_1.makeCandidatesFinder; } });
const makeCalculator_1 = require("./src/Factory/makeCalculator");
Object.defineProperty(exports, "makeJaccartSimilarityCalculator", { enumerable: true, get: function () { return makeCalculator_1.makeJaccartSimilarityCalculator; } });
const matrixFactory_1 = require("./src/Factory/matrixFactory");
Object.defineProperty(exports, "makeBaseSparseMatrix", { enumerable: true, get: function () { return matrixFactory_1.makeBaseSparseMatrix; } });
Object.defineProperty(exports, "makeSignatureMatrix", { enumerable: true, get: function () { return matrixFactory_1.makeSignatureMatrix; } });
const shinglingToolFactory_1 = require("./src/Factory/shinglingToolFactory");
Object.defineProperty(exports, "makeWordShinglingTool", { enumerable: true, get: function () { return shinglingToolFactory_1.makeWordShinglingTool; } });
Object.defineProperty(exports, "makeStringShinglingTool", { enumerable: true, get: function () { return shinglingToolFactory_1.makeStringShinglingTool; } });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readline_1 = __importDefault(require("readline"));
function process() {
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
                const promise = finder
                    .add(`review${count}`, line)
                    .catch((errors) => console.log(errors));
                promises.push(promise);
                count += 1;
                if (count > 10000) {
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
void process();
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
                if (count > 10000) {
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
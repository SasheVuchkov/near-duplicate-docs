"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAsyncDuplicatesFinder = exports.makeJaccartSimilarityCalculator = exports.makeBaseSparseMatrix = exports.makeSignatureMatrix = exports.makeStringShinglingTool = exports.makeWordShinglingTool = exports.makeCandidatesFinder = exports.makeDuplicatesFinder = void 0;
const duplicatesFinderFactory_1 = require("./src/Factory/duplicatesFinderFactory");
Object.defineProperty(exports, "makeAsyncDuplicatesFinder", { enumerable: true, get: function () { return duplicatesFinderFactory_1.makeAsyncDuplicatesFinder; } });
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
//# sourceMappingURL=index.js.map
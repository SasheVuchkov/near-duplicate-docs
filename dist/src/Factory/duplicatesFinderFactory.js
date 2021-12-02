"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDuplicatesFinderWithMocks = exports.makeAsyncDuplicatesFinder = exports.makeDuplicatesFinder = exports.isConfig = void 0;
const candidatesFinderFactory_1 = require("./candidatesFinderFactory");
const BaseNearDuplicatesFinder_1 = __importDefault(require("../BaseNearDuplicatesFinder"));
const JaccardSimilarityCalculator_1 = __importDefault(require("../SimilarityCalculator/JaccardSimilarityCalculator"));
const BaseAsyncNearDuplicatesFinder_1 = __importDefault(require("../BaseAsyncNearDuplicatesFinder"));
const guardFactory_1 = require("./guardFactory");
const isConfig = (value) => {
    const guard = (0, guardFactory_1.makeNearDuplicateFinderConfigGuard)();
    if (!guard.isValid(value)) {
        throw new Error(guard.getMessage());
    }
    return true;
};
exports.isConfig = isConfig;
const makeDuplicatesFinder = (config) => {
    (0, exports.isConfig)(config);
    const candidatesFinder = (0, candidatesFinderFactory_1.makeCandidatesFinder)(Object.assign({}, config));
    return new BaseNearDuplicatesFinder_1.default({ minSimilarity: config.minSimilarity }, candidatesFinder, new JaccardSimilarityCalculator_1.default());
};
exports.makeDuplicatesFinder = makeDuplicatesFinder;
const makeAsyncDuplicatesFinder = (config) => {
    (0, exports.isConfig)(config);
    const candidatesFinder = (0, candidatesFinderFactory_1.makeCandidatesFinder)(Object.assign({}, config));
    return new BaseAsyncNearDuplicatesFinder_1.default({ minSimilarity: config.minSimilarity }, candidatesFinder, new JaccardSimilarityCalculator_1.default());
};
exports.makeAsyncDuplicatesFinder = makeAsyncDuplicatesFinder;
const makeDuplicatesFinderWithMocks = (config) => {
    const candidatesFinder = (0, candidatesFinderFactory_1.makeCandidatesFinderWithMocks)(Object.assign({}, config));
    return new BaseNearDuplicatesFinder_1.default({ minSimilarity: config.minSimilarity }, candidatesFinder, new JaccardSimilarityCalculator_1.default());
};
exports.makeDuplicatesFinderWithMocks = makeDuplicatesFinderWithMocks;
//# sourceMappingURL=duplicatesFinderFactory.js.map
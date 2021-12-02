"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeJaccartSimilarityCalculator = void 0;
const JaccardSimilarityCalculator_1 = __importDefault(require("../SimilarityCalculator/JaccardSimilarityCalculator"));
const makeJaccartSimilarityCalculator = () => {
    return new JaccardSimilarityCalculator_1.default();
};
exports.makeJaccartSimilarityCalculator = makeJaccartSimilarityCalculator;
//# sourceMappingURL=calculatorFactory.js.map
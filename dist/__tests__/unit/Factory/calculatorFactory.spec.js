"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const calculatorFactory_1 = require("../../../src/Factory/calculatorFactory");
const JaccardSimilarityCalculator_1 = __importDefault(require("../../../src/SimilarityCalculator/JaccardSimilarityCalculator"));
describe("Testing Factory/calculatorFactory", () => {
    test("Test case: Is JaccardSimilarityCalculator", () => {
        const finder = (0, calculatorFactory_1.makeJaccartSimilarityCalculator)();
        expect(finder).toBeInstanceOf(JaccardSimilarityCalculator_1.default);
    });
});
//# sourceMappingURL=calculatorFactory.spec.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCandidatesFinder_1 = __importDefault(require("../../../src/BaseCandidatesFinder"));
const candidatesFinderFactory_1 = require("../../../src/Factory/candidatesFinderFactory");
describe("Testing Factory/candidatesFactory", () => {
    test("Test case: Is config", () => {
        expect((0, candidatesFinderFactory_1.isConfig)({ rowsPerBand: 5, signatureLength: 100, shinglesType: "char", shinglesSize: 5 })).toEqual(true);
    });
    test("Test case: Is not config", () => {
        expect(() => (0, candidatesFinderFactory_1.isConfig)({ rowsPerBand: {}, signatureLength: 100, shinglesType: "char", shinglesSize: 5 })).toThrow(`Missing or incorrect 'rowsPerBand': it must be number equal or larger than 1.`);
    });
    const config = { rowsPerBand: 5, signatureLength: 100, shinglesType: "char", shinglesSize: 5 };
    test("Test case: Is BaseCandidatesFinder", () => {
        const finder = (0, candidatesFinderFactory_1.makeCandidatesFinder)(config);
        expect(finder).toBeInstanceOf(BaseCandidatesFinder_1.default);
    });
    const config2 = { rowsPerBand: 5, signatureLength: 100, shinglesType: "word", shinglesSize: 5 };
    test("Test case: Is BaseCandidatesFinder with WordShinglingTool", () => {
        const finder = (0, candidatesFinderFactory_1.makeCandidatesFinder)(config2);
        expect(finder).toBeInstanceOf(BaseCandidatesFinder_1.default);
    });
});
//# sourceMappingURL=candidatesFactory.spec.js.map
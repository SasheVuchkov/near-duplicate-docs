"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const duplicatesFinderFactory_1 = require("../../../src/Factory/duplicatesFinderFactory");
const index_1 = require("../../../index");
describe("Testing Factory/duplicatesFactory", () => {
    test("Test case: Is config", () => {
        expect((0, duplicatesFinderFactory_1.isConfig)({ minSimilarity: 0.1, rowsPerBand: 5, signatureLength: 100, shinglesType: "char", shinglesSize: 5 })).toEqual(true);
    });
    test("Test case: Is not config", () => {
        expect(() => (0, duplicatesFinderFactory_1.isConfig)({ minSimilarity: -1, rowsPerBand: 5, signatureLength: 100, shinglesType: "char", shinglesSize: 5 })).toThrow(`Missing or incorrect 'minSimilarity': it must be number between 0 and 1.`);
    });
    const config = { minSimilarity: 0.1, rowsPerBand: 5, signatureLength: 100, shinglesType: "char", shinglesSize: 5 };
    test("Test case: Is Sync DuplicateFinder", () => {
        const finder = (0, duplicatesFinderFactory_1.makeDuplicatesFinder)(config);
        expect(finder).toBeInstanceOf(index_1.BaseNearDuplicatesFinder);
    });
    test("Test case: Is Async DuplicateFinder", () => {
        const finder = (0, duplicatesFinderFactory_1.makeAsyncDuplicatesFinder)(config);
        expect(finder).toBeInstanceOf(index_1.BaseAsyncNearDuplicatesFinder);
    });
});
//# sourceMappingURL=duplicatesFactory.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guardFactory_1 = require("../../../src/Factory/guardFactory");
describe("Testing Factory/guardFactory", () => {
    let data = [
        [
            "Test case: Wrong minSimilarity",
            {
                minSimilarity: -1,
                rowsPerBand: 5,
                signatureLength: 100,
                shinglesType: "char",
                shinglesSize: 5,
            },
            false,
        ],
        [
            "Test case: Wrong rowsPerBand",
            {
                minSimilarity: 0.3,
                rowsPerBand: "fasdf",
                signatureLength: 100,
                shinglesType: "char",
                shinglesSize: 5,
            },
            false,
        ],
        [
            "Test case: Wrong signatureLength",
            {
                minSimilarity: 0.9,
                rowsPerBand: 5,
                signatureLength: 0,
                shinglesType: "char",
                shinglesSize: 5,
            },
            false,
        ],
        [
            "Test case: Wrong shinglesType",
            {
                minSimilarity: 1,
                rowsPerBand: 5,
                signatureLength: 100,
                shinglesType: "wave",
                shinglesSize: 5,
            },
            false,
        ],
        [
            "Test case: Wrong shinglesSize",
            {
                minSimilarity: -1,
                rowsPerBand: 5,
                signatureLength: 100,
                shinglesType: "char",
                shinglesSize: {},
            },
            false,
        ],
        [
            "Test case: Is Config",
            {
                minSimilarity: 1,
                rowsPerBand: 5,
                signatureLength: 100,
                shinglesType: "char",
                shinglesSize: 5,
            },
            true,
        ],
    ];
    test.each(data)("%s", (testCase, data, expected) => {
        const applicator = (0, guardFactory_1.makeNearDuplicateFinderConfigGuard)();
        expect(applicator.isValid(data)).toEqual(expected);
    });
    data = [
        [
            "Test case: Wrong rowsPerBand",
            {
                rowsPerBand: "fasdf",
                signatureLength: 100,
                shinglesType: "char",
                shinglesSize: 5,
            },
            false,
        ],
        [
            "Test case: Wrong signatureLength",
            {
                rowsPerBand: 5,
                signatureLength: 0,
                shinglesType: "char",
                shinglesSize: 5,
            },
            false,
        ],
        [
            "Test case: Wrong shinglesType",
            {
                rowsPerBand: 5,
                signatureLength: 100,
                shinglesType: "wave",
                shinglesSize: 5,
            },
            false,
        ],
        [
            "Test case: Wrong shinglesSize",
            {
                rowsPerBand: 5,
                signatureLength: 100,
                shinglesType: "char",
                shinglesSize: {},
            },
            false,
        ],
        [
            "Test case: Is Config",
            {
                rowsPerBand: 5,
                signatureLength: 100,
                shinglesType: "char",
                shinglesSize: 5,
            },
            true,
        ],
    ];
    test.each(data)("%s", (testCase, data, expected) => {
        const applicator = (0, guardFactory_1.makeCandidatesFinderConfigGuard)();
        expect(applicator.isValid(data)).toEqual(expected);
    });
});
//# sourceMappingURL=guardFactory.spec.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IsMinSimilarityGuard_1 = __importDefault(require("../../../src/Guard/IsMinSimilarityGuard"));
const ApplicatorGuard_1 = __importDefault(require("../../../src/Guard/ApplicatorGuard"));
const IsRowsPerBandGuard_1 = __importDefault(require("../../../src/Guard/IsRowsPerBandGuard"));
describe("Testing Guard/ApplicatorGuard", () => {
    const data = [
        [
            "Test case: Is not minSimilarity",
            { minSimilarity: -5, rowsPerBand: 5 },
            [
                false,
                `Missing or incorrect 'minSimilarity': it must be number between 0 and 1.`,
            ],
        ],
        [
            "Test case: Is not minSimilarity and rowsPerBand",
            { minSimilarity: -5, rowsPerBand: {} },
            [
                false,
                `Missing or incorrect 'rowsPerBand': it must be number equal or larger than 1.`,
            ],
        ],
        [
            "Test case: Is not rowsPerBand",
            { minSimilarity: 0.5, rowsPerBand: "fasfd" },
            [
                false,
                `Missing or incorrect 'rowsPerBand': it must be number equal or larger than 1.`,
            ],
        ],
        [
            "Test case: Everything is OK",
            { minSimilarity: 1, rowsPerBand: 5 },
            [true, `Some of the guards returned false`],
        ],
    ];
    test.each(data)("%s", (testCase, data, expected) => {
        const guard = new ApplicatorGuard_1.default();
        guard.addGuard(new IsMinSimilarityGuard_1.default());
        guard.addGuard(new IsRowsPerBandGuard_1.default());
        expect(guard.isValid(data)).toEqual(expected[0]);
        expect(guard.getMessage()).toEqual(expected[1]);
    });
});
//# sourceMappingURL=ApplicatorGuard.spec.js.map
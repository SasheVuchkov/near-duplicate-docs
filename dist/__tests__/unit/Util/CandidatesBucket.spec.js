"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CandidatesBucket_1 = __importDefault(require("../../../src/Util/CandidatesBucket"));
describe("Testing Utils/CandidatesBucket class", () => {
    test("Test case: Checking is the collected data correct", () => {
        const bucket = new CandidatesBucket_1.default();
        bucket.add("1", "doc1");
        bucket.add("1", "doc2");
        bucket.add("1.5", "doc5");
        bucket.add("1.5", "doc6");
        bucket.add("2", "doc1");
        bucket.add("2", "doc3");
        bucket.add("3", "doc4");
        const expectedPairs = [
            ["doc1", "doc2", "doc3"],
            ["doc5", "doc6"],
        ];
        const uniquePairs = bucket.compress();
        expect(uniquePairs).toEqual(expectedPairs);
        const rawData = bucket.getData();
        const expectedData = {
            "1": ["doc1", "doc2"],
            "1.5": ["doc5", "doc6"],
            "2": ["doc1", "doc3"],
            "3": ["doc4"],
        };
        expect(rawData).toEqual(expectedData);
    });
});
//# sourceMappingURL=CandidatesBucket.spec.js.map
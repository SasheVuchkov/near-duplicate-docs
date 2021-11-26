"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MergeSort_1 = __importDefault(require("../../src/Util/MergeSort"));
describe('Testing Utils/MergeSort class', () => {
    const numbers = [
        ['Test case: Sorting numbers ASC', [5, 6, 6, 8, 9, 2, 1], (a, b) => a < b, [1, 2, 5, 6, 6, 8, 9]],
        ['Test case: Sorting array of length 1', [5], (a, b) => a < b, [5]],
        ['Test case: Sorting empty array', [], (a, b) => a < b, []],
        ['Test case: Sorting numbers DESC', [1, 3, 12, 13, 9, 2, 5], (a, b) => a > b, [13, 12, 9, 5, 3, 2, 1]],
        ['Test case: Sorting repeating numbers', [3, 3, 3, 3, 3], (a, b) => a < b, [3, 3, 3, 3, 3]],
    ];
    test.each(numbers)('%s', (testCase, arr, callback, expected) => {
        const algo = new MergeSort_1.default(callback);
        const sorted = algo.sort(arr);
        console.log(sorted);
        expect(sorted.length).toEqual(expected.length);
        expected.forEach((val, index) => {
            expect(sorted[index]).toEqual(val);
        });
    });
});
//# sourceMappingURL=MergeSort.spec.js.map
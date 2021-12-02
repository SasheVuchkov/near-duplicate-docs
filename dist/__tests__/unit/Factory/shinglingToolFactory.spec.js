"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../../index");
const index_2 = require("../../../index");
describe("Testing Factory/shinglingToolFactory", () => {
    test("Test case: Is WordShinglingTool", () => {
        const finder = (0, index_2.makeWordShinglingTool)(10);
        expect(finder).toBeInstanceOf(index_1.WordShinglingTool);
    });
    test("Test case: Is StringShinglingTool", () => {
        const finder = (0, index_2.makeStringShinglingTool)(10);
        expect(finder).toBeInstanceOf(index_1.StringShinglingTool);
    });
});
//# sourceMappingURL=shinglingToolFactory.spec.js.map
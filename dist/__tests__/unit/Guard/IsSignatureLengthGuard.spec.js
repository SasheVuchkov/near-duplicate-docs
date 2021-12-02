"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IsSignatureLengthGuard_1 = __importDefault(require("../../../src/Guard/IsSignatureLengthGuard"));
describe("Testing Guard/IsSignatureLengthGuard", () => {
    const guard = new IsSignatureLengthGuard_1.default();
    test("Test case: Is not number", () => {
        expect(guard.isValid("falsdfkj")).toEqual(false);
        expect(guard.isValid({})).toEqual(false);
    });
    test("Test case: Is less than 1", () => {
        expect(guard.isValid(0)).toEqual(false);
    });
    test("Test case: Is signature length", () => {
        expect(guard.isValid(100)).toEqual(true);
    });
    test("Test case: The message is correct", () => {
        expect(guard.getMessage()).toEqual(`Missing or incorrect 'signatureLength': it must be number equal or larger than 1.`);
    });
    test("Test case: The property name is correct", () => {
        expect(guard.getPropertyName()).toEqual(`signatureLength`);
    });
});
//# sourceMappingURL=IsSignatureLengthGuard.spec.js.map
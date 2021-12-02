"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IsShinglesTypeGuard_1 = __importDefault(require("../../../src/Guard/IsShinglesTypeGuard"));
describe("Testing Guard/IsShinglesTypeGuard", () => {
    const guard = new IsShinglesTypeGuard_1.default();
    test("Test case: Is not type", () => {
        expect(guard.isValid("wave")).toEqual(false);
        expect(guard.isValid(-1)).toEqual(false);
    });
    test("Test case: Is char", () => {
        expect(guard.isValid("char")).toEqual(true);
    });
    test("Test case: Is word", () => {
        expect(guard.isValid("word")).toEqual(true);
    });
    test("Test case: The message is correct", () => {
        expect(guard.getMessage()).toEqual(`Missing or incorrect 'shinglesType': it must be 'char' or 'word'.`);
    });
    test("Test case: The property name is correct", () => {
        expect(guard.getPropertyName()).toEqual(`shinglesType`);
    });
});
//# sourceMappingURL=IsShinglesType.spec.js.map
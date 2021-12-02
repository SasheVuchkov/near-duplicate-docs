"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractGuard_1 = __importDefault(require("./AbstractGuard"));
class IsShinglesTypeGuard extends AbstractGuard_1.default {
    constructor() {
        super(...arguments);
        this.property = "shinglesType";
        this.message = `Missing or incorrect 'shinglesType': it must be 'char' or 'word'.`;
    }
    isValid(value) {
        return value === "char" || value === "word";
    }
}
exports.default = IsShinglesTypeGuard;
//# sourceMappingURL=IsShinglesTypeGuard.js.map
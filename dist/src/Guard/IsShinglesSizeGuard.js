"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractGuard_1 = __importDefault(require("./AbstractGuard"));
class IsShinglesSizeGuard extends AbstractGuard_1.default {
    constructor() {
        super(...arguments);
        this.property = "shinglesSize";
        this.message = `Missing or incorrect 'shinglesSize': it must be number equal or larger than 1.`;
    }
    isValid(value) {
        return typeof value === "number" && value >= 1;
    }
}
exports.default = IsShinglesSizeGuard;
//# sourceMappingURL=IsShinglesSizeGuard.js.map
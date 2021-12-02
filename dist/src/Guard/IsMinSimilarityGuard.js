"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractGuard_1 = __importDefault(require("./AbstractGuard"));
class IsMinSimilarityGuard extends AbstractGuard_1.default {
    constructor() {
        super(...arguments);
        this.property = "minSimilarity";
        this.message = `Missing or incorrect 'minSimilarity': it must be number between 0 and 1.`;
    }
    isValid(value) {
        return typeof value === "number" && value >= 0 && value <= 100;
    }
}
exports.default = IsMinSimilarityGuard;
//# sourceMappingURL=IsMinSimilarityGuard.js.map
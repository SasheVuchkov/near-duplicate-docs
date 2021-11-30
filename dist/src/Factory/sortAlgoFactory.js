"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMergeSortAlgo = void 0;
const MergeSort_1 = __importDefault(require("../Util/MergeSort"));
const makeMergeSortAlgo = () => new MergeSort_1.default((left, right) => left[1] < right[1]);
exports.makeMergeSortAlgo = makeMergeSortAlgo;
//# sourceMappingURL=sortAlgoFactory.js.map
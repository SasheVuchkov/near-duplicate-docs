"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeStringShinglingTool = exports.makeWordShinglingTool = void 0;
const WordShinglingTool_1 = __importDefault(require("../ShinglingTool/WordShinglingTool"));
const hasherFactory_1 = require("./hasherFactory");
const StringShinglingTool_1 = __importDefault(require("../ShinglingTool/StringShinglingTool"));
const makeWordShinglingTool = (shingleSize) => {
    return new WordShinglingTool_1.default(shingleSize, (0, hasherFactory_1.getCompactHasher)());
};
exports.makeWordShinglingTool = makeWordShinglingTool;
const makeStringShinglingTool = (shingleSize) => {
    return new StringShinglingTool_1.default(shingleSize, (0, hasherFactory_1.getCompactHasher)());
};
exports.makeStringShinglingTool = makeStringShinglingTool;
//# sourceMappingURL=shinglingToolFactory.js.map
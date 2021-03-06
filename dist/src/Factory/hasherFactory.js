"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompactHasher = void 0;
const jshashes_1 = __importDefault(require("jshashes"));
const getCompactHasher = () => {
    const hasher = new jshashes_1.default.SHA256().hex;
    return (str) => {
        const hash = hasher(str);
        return parseInt(`0x${hash.slice(0, 2)}${hash.slice(Math.floor(hash.length / 2), Math.floor(hash.length / 2) + 3)}${hash.slice(-2)}`, 16);
    };
};
exports.getCompactHasher = getCompactHasher;
//# sourceMappingURL=hasherFactory.js.map
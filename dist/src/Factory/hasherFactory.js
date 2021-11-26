"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMd5 = exports.getSha256 = exports.getCompactHasher = void 0;
const jshashes_1 = __importDefault(require("jshashes"));
const getCompactHasher = () => {
    const hasher = new jshashes_1.default.SHA256().hex;
    return (str) => {
        const hash = hasher(str);
        return parseInt(`0x${hash.slice(0, 3)}${hash.slice(hash.length, 3)}${hash.slice(-3)}`, 16);
    };
};
exports.getCompactHasher = getCompactHasher;
const getSha256 = () => new jshashes_1.default.SHA256().hex;
exports.getSha256 = getSha256;
const getMd5 = () => new jshashes_1.default.MD5().hex;
exports.getMd5 = getMd5;
//# sourceMappingURL=hasherFactory.js.map
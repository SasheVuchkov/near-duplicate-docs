"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saltedHash = exports.generateSalts = exports.makeSignatureVectorFactory = void 0;
const jshashes_1 = __importDefault(require("jshashes"));
let salts;
const hasher = (new jshashes_1.default.MD5()).hex;
const makeSignatureVectorFactory = (sigLength, forceRegeneration) => {
    salts = !salts || forceRegeneration ? (0, exports.generateSalts)(sigLength) : salts;
    const signature = {};
    return (shingle) => {
        salts.forEach(salt => {
            const hash = hasher(shingle.toString() + salt);
            if (!signature[salt]) {
                signature[salt] = hash;
                return;
            }
            signature[salt] = signature[salt] <= hash ? signature[salt] : hash;
        });
        return signature;
    };
};
exports.makeSignatureVectorFactory = makeSignatureVectorFactory;
const generateSalts = (length) => {
    const salts = [];
    while (salts.length < length) {
        salts.push(Math.floor(Math.random() * 99999999));
    }
    return salts;
};
exports.generateSalts = generateSalts;
const saltedHash = (str, salt) => hasher(str + salt);
exports.saltedHash = saltedHash;
//# sourceMappingURL=signatureVectorFactory.js.map
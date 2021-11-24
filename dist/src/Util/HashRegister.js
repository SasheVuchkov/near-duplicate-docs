"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeHashRegister = void 0;
const hasherFactory_1 = require("../Factory/hasherFactory");
class HashRegister {
    constructor(algo) {
        this.hashes = [];
        this.check = (str) => {
            const hash = this.algo(str);
            if (this.hashes.includes(hash)) {
                return true;
            }
            this.hashes.push(hash);
            return false;
        };
        this.isRegistered = (str) => {
            return this.hashes.includes(this.algo(str));
        };
        this.count = () => this.hashes.length;
        this.algo = 'sha256' === algo ? (0, hasherFactory_1.getSha256)() : (0, hasherFactory_1.getMd5)();
    }
}
exports.default = HashRegister;
const makeHashRegister = (algo) => new HashRegister(algo);
exports.makeHashRegister = makeHashRegister;
//# sourceMappingURL=HashRegister.js.map
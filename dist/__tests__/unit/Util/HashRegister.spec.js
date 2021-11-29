"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const HashRegister_1 = __importStar(require("../../../src/Util/HashRegister"));
describe("Testing Utils/HashRegister class", () => {
    test("Test case: The register is empty", () => {
        const register = new HashRegister_1.default("md5");
        expect(register.count()).toEqual(0);
    });
    const data1 = [
        ["Some cache that is registered", true, true],
        ["Other cache that is not registered", false, false],
    ];
    test.each(data1)("Test case: The methods isRegistered & check works properly", (str, shouldRegister, expected) => {
        const register = new HashRegister_1.default("md5");
        if (shouldRegister) {
            register.check(str);
        }
        expect(register.isRegistered(str)).toEqual(expected);
        expect(register.check(str)).toEqual(expected);
    });
    const data2 = [
        [
            "md5",
            "Some string",
            32,
            "80F855E731CC0C9AA336CA4D25F990BE".toLowerCase(),
        ],
        [
            "sha256",
            "Some string",
            64,
            "2BEAF0548E770C4C392196E0EC8E7D6D81CC9280AC9C7F3323E4C6ABC231E95A".toLowerCase(),
        ],
    ];
    test.each(data2)("Test case: The register uses the chosen algorithm (%s)", (algo, str, hashLength, expected) => {
        var _a;
        const register = (0, HashRegister_1.makeHashRegister)(algo);
        register.check(str);
        expect((_a = register.getHash("str")) === null || _a === void 0 ? void 0 : _a.length).toEqual(hashLength);
        expect(register.getHash("str")).toEqual(expected);
        expect(register.count()).toEqual(1);
    });
});
//# sourceMappingURL=HashRegister.spec.js.map
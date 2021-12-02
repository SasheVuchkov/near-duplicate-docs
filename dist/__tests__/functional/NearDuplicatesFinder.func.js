"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const duplicatesFinderFactory_1 = require("../../src/Factory/duplicatesFinderFactory");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readline_1 = __importDefault(require("readline"));
describe("Testing NearDuplicateFinder class", () => {
    test("Test case: It found near duplicate docs using word shingles", () => __awaiter(void 0, void 0, void 0, function* () {
        var e_1, _a;
        const expected = {
            review5: [
                [1, "review6"],
                [0.926829268292683, "review136"],
            ],
            review6: [[0.926829268292683, "review136"]],
            review81: [[0.8582677165354331, "review9"]],
        };
        const finder = (0, duplicatesFinderFactory_1.makeDuplicatesFinderWithMocks)({
            minSimilarity: 0.01,
            shinglesSize: 5,
            shinglesType: "word",
            signatureLength: 100,
            rowsPerBand: 5,
        });
        const fileStream = fs_1.default.createReadStream(path_1.default.join(__dirname, "..", "..", "datasets", "reviews.test.txt"));
        const rl = readline_1.default.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        let count = 0;
        try {
            for (var rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = yield rl_1.next(), !rl_1_1.done;) {
                const line = rl_1_1.value;
                finder.add(`review${count}`, line);
                count += 1;
                if (count > 200) {
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (rl_1_1 && !rl_1_1.done && (_a = rl_1.return)) yield _a.call(rl_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        const duplicates = finder.search();
        expect(duplicates).toEqual(expected);
    }));
    test("Test case: It found all near duplicate docs using string shingles", () => __awaiter(void 0, void 0, void 0, function* () {
        var e_2, _b;
        const expected = {
            review5: [
                [1, "review6"],
                [0.9430284857571214, "review136"],
            ],
            review6: [[0.9430284857571214, "review136"]],
            review9: [[0.8916129032258064, "review81"]],
        };
        const finder = (0, duplicatesFinderFactory_1.makeDuplicatesFinderWithMocks)({
            minSimilarity: 0.01,
            shinglesSize: 5,
            shinglesType: "char",
            signatureLength: 100,
            rowsPerBand: 5,
        });
        const fileStream = fs_1.default.createReadStream(path_1.default.join(__dirname, "..", "..", "datasets", "reviews.test.txt"));
        const rl = readline_1.default.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        let count = 0;
        try {
            for (var rl_2 = __asyncValues(rl), rl_2_1; rl_2_1 = yield rl_2.next(), !rl_2_1.done;) {
                const line = rl_2_1.value;
                finder.add(`review${count}`, line);
                count += 1;
                if (count > 200) {
                    break;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (rl_2_1 && !rl_2_1.done && (_b = rl_2.return)) yield _b.call(rl_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        const duplicates = finder.search();
        expect(duplicates).toEqual(expected);
    }));
    test("Test case: It found near duplicate docs using word shingles (Async)", () => __awaiter(void 0, void 0, void 0, function* () {
        var e_3, _c;
        const expected = {
            review5: [
                [1, "review6"],
                [0.926829268292683, "review136"],
            ],
            review6: [[0.926829268292683, "review136"]],
            review81: [[0.8582677165354331, "review9"]],
        };
        const finder = (0, duplicatesFinderFactory_1.makeAsyncDuplicatesFinderWithMocks)({
            minSimilarity: 0.01,
            shinglesSize: 5,
            shinglesType: "word",
            signatureLength: 100,
            rowsPerBand: 5,
        });
        const fileStream = fs_1.default.createReadStream(path_1.default.join(__dirname, "..", "..", "datasets", "reviews.test.txt"));
        const rl = readline_1.default.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        let count = 0;
        try {
            for (var rl_3 = __asyncValues(rl), rl_3_1; rl_3_1 = yield rl_3.next(), !rl_3_1.done;) {
                const line = rl_3_1.value;
                yield finder.add(`review${count}`, line);
                count += 1;
                if (count > 200) {
                    break;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (rl_3_1 && !rl_3_1.done && (_c = rl_3.return)) yield _c.call(rl_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
        const duplicates = yield finder.search();
        expect(duplicates).toEqual(expected);
    }));
});
//# sourceMappingURL=NearDuplicatesFinder.func.js.map
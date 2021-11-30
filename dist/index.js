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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readline_1 = __importDefault(require("readline"));
const duplicatesFinderFactory_1 = require("./src/Factory/duplicatesFinderFactory");
const finder = (0, duplicatesFinderFactory_1.makeDuplicatesFinder)({
    minSimilarity: 0.01,
    shinglesSize: 5,
    shinglesType: "word",
    signatureLength: 100,
    rowsPerBand: 5,
});
finder.on("doc_added", (candidates) => {
    console.log(candidates);
});
finder.on("found_candidates", (candidates) => console.log(candidates));
finder.on("score", (duplicates) => console.log(duplicates));
const process = () => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    let count = 0;
    try {
        const fileStream = fs_1.default.createReadStream(path_1.default.join(__dirname, "..", "datasets", "reviews.test.txt"));
        const rl = readline_1.default.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        try {
            // Note: we use the crlfDelay option to recognize all instances of CR LF
            // ('\r\n') in input.txt as a single line break.
            for (var rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = yield rl_1.next(), !rl_1_1.done;) {
                const line = rl_1_1.value;
                // Each line in input.txt will be successively available here as `line`.
                const ln = line.replace(/__label__[0-9] /gi, "");
                finder.add(`review${count}`, ln);
                count += 1;
                if (count > 200) {
                    //break;
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
    }
    catch (err) {
        console.error(err);
    }
    const duplicates = finder.search();
    console.log(duplicates);
});
void process();
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCandidatesFinderConfigGuard = exports.makeNearDuplicateFinderConfigGuard = void 0;
const ApplicatorGuard_1 = __importDefault(require("../Guard/ApplicatorGuard"));
const IsMinSimilarityGuard_1 = __importDefault(require("../Guard/IsMinSimilarityGuard"));
const IsShinglesSizeGuard_1 = __importDefault(require("../Guard/IsShinglesSizeGuard"));
const IsSignatureLengthGuard_1 = __importDefault(require("../Guard/IsSignatureLengthGuard"));
const IsShinglesTypeGuard_1 = __importDefault(require("../Guard/IsShinglesTypeGuard"));
const IsRowsPerBandGuard_1 = __importDefault(require("../Guard/IsRowsPerBandGuard"));
const makeNearDuplicateFinderConfigGuard = () => {
    const applicator = new ApplicatorGuard_1.default();
    applicator.addGuard(new IsMinSimilarityGuard_1.default());
    applicator.addGuard(new IsShinglesSizeGuard_1.default());
    applicator.addGuard(new IsShinglesTypeGuard_1.default());
    applicator.addGuard(new IsSignatureLengthGuard_1.default());
    applicator.addGuard(new IsRowsPerBandGuard_1.default());
    return applicator;
};
exports.makeNearDuplicateFinderConfigGuard = makeNearDuplicateFinderConfigGuard;
const makeCandidatesFinderConfigGuard = () => {
    const applicator = new ApplicatorGuard_1.default();
    applicator.addGuard(new IsShinglesSizeGuard_1.default());
    applicator.addGuard(new IsShinglesTypeGuard_1.default());
    applicator.addGuard(new IsSignatureLengthGuard_1.default());
    applicator.addGuard(new IsRowsPerBandGuard_1.default());
    return applicator;
};
exports.makeCandidatesFinderConfigGuard = makeCandidatesFinderConfigGuard;
//# sourceMappingURL=guardFactory.js.map
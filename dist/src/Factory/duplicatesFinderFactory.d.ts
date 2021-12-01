import BaseNearDuplicatesFinder from "../BaseNearDuplicatesFinder";
import AsyncNearDuplicatesFinder from "../AsyncNearDuplicatesFinder";
export declare type Config = {
    minSimilarity: number;
    shinglesSize: number;
    shinglesType: "char" | "word";
    signatureLength: number;
    rowsPerBand: number;
};
export declare const makeDuplicatesFinder: (config: Config) => BaseNearDuplicatesFinder;
export declare const makeAsyncDuplicatesFinder: (config: Config) => AsyncNearDuplicatesFinder;
export declare const makeDuplicatesFinderWithMocks: (config: Config) => BaseNearDuplicatesFinder;

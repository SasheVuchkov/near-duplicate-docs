import BaseNearDuplicatesFinder from "../BaseNearDuplicatesFinder";
import BaseAsyncNearDuplicatesFinder from "../BaseAsyncNearDuplicatesFinder";
export declare type Config = {
    minSimilarity: number;
    shinglesSize: number;
    shinglesType: "char" | "word";
    signatureLength: number;
    rowsPerBand: number;
};
export declare const isConfig: (value: any) => value is Config;
export declare const makeDuplicatesFinder: (config: Config) => BaseNearDuplicatesFinder;
export declare const makeAsyncDuplicatesFinder: (config: Config) => BaseAsyncNearDuplicatesFinder;
export declare const makeDuplicatesFinderWithMocks: (config: Config) => BaseNearDuplicatesFinder;
export declare const makeAsyncDuplicatesFinderWithMocks: (config: Config) => BaseAsyncNearDuplicatesFinder;

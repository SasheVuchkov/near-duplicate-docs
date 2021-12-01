import BaseCandidatesFinder from "../BaseCandidatesFinder";
export declare type Config = {
    shinglesSize: number;
    shinglesType: "char" | "word";
    signatureLength: number;
    rowsPerBand: number;
};
export declare const makeCandidatesFinder: (config: Config) => BaseCandidatesFinder;
export declare const makeCandidatesFinderWithMocks: (config: Config) => BaseCandidatesFinder;

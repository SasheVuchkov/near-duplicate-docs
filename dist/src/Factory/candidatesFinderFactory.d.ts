import BaseCandidatesFinder from "../BaseCandidatesFinder";
export declare const makeCandidatesFinder: (config: {
    shinglesSize: number;
    shinglesType: "char" | "word";
    signatureLength: number;
    rowsPerBand: number;
}) => BaseCandidatesFinder;

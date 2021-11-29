import CandidateDuplicatesFinder from "../CandidateDuplicatesFinder";
export declare const makeCandidatesFinder: (config: {
    shinglesSize: number;
    shinglesType: "char" | "word";
    signatureLength: number;
    rowsPerBand: number;
}) => CandidateDuplicatesFinder;

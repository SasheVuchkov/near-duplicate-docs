import NearDuplicatesFinder from "../NearDuplicatesFinder";
export declare const makeDuplicatesFinder: (config: {
    minSimilarity: number;
    shinglesSize: number;
    shinglesType: "char" | "word";
    signatureLength: number;
    rowsPerBand: number;
}) => NearDuplicatesFinder;

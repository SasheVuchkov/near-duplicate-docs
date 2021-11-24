export declare type SignatureVector = {
    [salt: string]: string;
};
export declare const makeSignatureVectorFactory: (sigLength: number, forceRegeneration?: boolean | undefined) => (shingle: number) => SignatureVector;
export declare const generateSalts: (length: number) => number[];
export declare const saltedHash: (str: string, salt: string) => string;

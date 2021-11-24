import Hashes from "jshashes";

export type SignatureVector = {[salt: string]: string};

let salts: number[];
const hasher = (new Hashes.MD5()).hex;
export const makeSignatureVectorFactory = (sigLength: number, forceRegeneration?: boolean): (shingle: number) => SignatureVector  => {
    salts = !salts || forceRegeneration ? generateSalts(sigLength) : salts;
    const signature: SignatureVector = {};

    return (shingle: number) => {
        salts.forEach(salt => {
            const hash = hasher(shingle.toString()+salt);
            if (!signature[salt]) {
                signature[salt] = hash;
                return;
            }
            signature[salt] = signature[salt] <= hash ? signature[salt] : hash;
        });
        return signature;
    }
}

export const generateSalts = (length: number): number[] => {
    const salts: number[] = [];
    while(salts.length < length) {
        salts.push(Math.floor(Math.random() * 99999999));
    }

    return salts;
}

export const saltedHash = (str: string, salt: string): string => hasher(str+salt);

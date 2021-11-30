import ValueRegister from "./ValueRegister";
export default class HashRegister implements ValueRegister<string, string> {
    protected hashes: string[];
    protected algo: (str: string) => string;
    constructor(algo: "sha256" | "md5");
    check: (str: string) => boolean;
    isRegistered: (str: string) => boolean;
    get: (str: string) => string | undefined;
    count: () => number;
}
export declare const makeHashRegister: (algo: "sha256" | "md5") => HashRegister;

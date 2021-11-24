export default class HashRegister {
    protected hashes: string[];
    protected algo: any;
    constructor(algo: 'sha256' | 'md5');
    check: (str: string) => boolean;
    isRegistered: (str: string) => boolean;
    count: () => number;
}
export declare const makeHashRegister: (algo: 'sha256' | 'md5') => HashRegister;

import { getMd5, getSha256 } from "../Factory/hasherFactory";

export default class HashRegister {
  protected hashes: string[] = [];
  protected algo: (str: string) => string;

  public constructor(algo: "sha256" | "md5") {
    this.algo = "sha256" === algo ? getSha256() : getMd5();
  }

  public check = (str: string): boolean => {
    const hash = this.algo(str);

    if (this.hashes.includes(hash)) {
      return true;
    }

    this.hashes.push(hash);
    return false;
  };

  public isRegistered = (str: string): boolean => {
    return this.hashes.includes(this.algo(str));
  };

  public count = (): number => this.hashes.length;
}

export const makeHashRegister = (algo: "sha256" | "md5") =>
  new HashRegister(algo);

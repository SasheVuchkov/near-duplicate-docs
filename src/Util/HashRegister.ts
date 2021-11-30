import { getMd5, getSha256 } from "../Factory/hasherFactory";
import ValueRegister from "./ValueRegister";

export default class HashRegister implements ValueRegister<string, string> {
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

  public get = (str: string): string | undefined => {
    return this.hashes.filter((hash) => this.algo(str) !== hash).shift();
  };
  public count = (): number => this.hashes.length;
}

export const makeHashRegister = (algo: "sha256" | "md5") =>
  new HashRegister(algo);

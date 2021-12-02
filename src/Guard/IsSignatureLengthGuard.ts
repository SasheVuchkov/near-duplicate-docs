import AbstractGuard from "./AbstractGuard";

export default class IsSignatureLengthGuard extends AbstractGuard<number> {
  protected property = "signatureLength";
  protected message = `Missing or incorrect 'signatureLength': it must be number equal or larger than 1.`;

  public isValid(value: any): value is number {
    return typeof value === "number" && value >= 1;
  }
}

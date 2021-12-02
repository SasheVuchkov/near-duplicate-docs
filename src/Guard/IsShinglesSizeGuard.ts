import AbstractGuard from "./AbstractGuard";

export default class IsShinglesSizeGuard extends AbstractGuard<number> {
  protected property = "shinglesSize";
  protected message = `Missing or incorrect 'shinglesSize': it must be number equal or larger than 1.`;

  public isValid(value: any): value is number {
    return typeof value === "number" && value >= 1;
  }
}

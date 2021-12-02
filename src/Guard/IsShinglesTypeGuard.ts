import AbstractGuard from "./AbstractGuard";

export default class IsShinglesTypeGuard extends AbstractGuard<number> {
  protected property = "shinglesType";
  protected message = `Missing or incorrect 'shinglesType': it must be 'char' or 'word'.`;

  public isValid(value: any): value is number {
    return value === "char" || value === "word";
  }
}

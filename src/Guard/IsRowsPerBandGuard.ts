import AbstractGuard from "./AbstractGuard";

export default class IsRowsPerBandGuard extends AbstractGuard<number> {
  protected property = "rowsPerBand";
  protected message = `Missing or incorrect 'rowsPerBand': it must be number equal or larger than 1.`;

  public isValid(value: any): value is number {
    return typeof value === "number" && value >= 1;
  }
}

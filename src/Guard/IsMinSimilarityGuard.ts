import AbstractGuard from "./AbstractGuard";

export default class IsMinSimilarityGuard extends AbstractGuard<number> {
  protected property = "minSimilarity";
  protected message = `Missing or incorrect 'minSimilarity': it must be number between 0 and 1.`;

  public isValid(value: any): value is number {
    return typeof value === "number" && value >= 0 && value <= 100;
  }
}

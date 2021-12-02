import Guard from "./Guard";

export default abstract class AbstractGuard<T> implements Guard<T> {
  protected message = "";
  protected property = "";

  public getMessage(): string {
    return this.message;
  }

  public getPropertyName(): string {
    return this.property;
  }

  public abstract isValid(value: any): value is T;
}

import AbstractGuard from "./AbstractGuard";
import Guard from "./Guard";

export default class ApplicatorGuard<T> extends AbstractGuard<T> {
  protected message = "Some of the guards returned false";
  protected guards: Guard<any>[] = [];

  public addGuard(guard: Guard<any>): void {
    this.guards.push(guard);
  }

  public isValid(value: any): value is T {
    value = value as T;

    let allValid = true;
    this.guards.forEach((guard) => {
      if (!guard.isValid(value[guard.getPropertyName()])) {
        allValid = false;
        this.message = guard.getMessage();
      }
    });

    return allValid;
  }
}

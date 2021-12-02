import Guard from "./Guard";
export default abstract class AbstractGuard<T> implements Guard<T> {
    protected message: string;
    protected property: string;
    getMessage(): string;
    getPropertyName(): string;
    abstract isValid(value: any): value is T;
}

export default interface Guard<T> {
    getMessage(): string;
    getPropertyName(): string;
    isValid(value: any): value is T;
}

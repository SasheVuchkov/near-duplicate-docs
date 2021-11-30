export default interface ValueRegister<T, S> {
    check(value: T): boolean;
    isRegistered(value: T): boolean;
    get(value: T): S | undefined;
    count(): number;
}

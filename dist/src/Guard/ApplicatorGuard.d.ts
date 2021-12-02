import AbstractGuard from "./AbstractGuard";
import Guard from "./Guard";
export default class ApplicatorGuard<T> extends AbstractGuard<T> {
    protected message: string;
    protected guards: Guard<any>[];
    addGuard(guard: Guard<any>): void;
    isValid(value: any): value is T;
}

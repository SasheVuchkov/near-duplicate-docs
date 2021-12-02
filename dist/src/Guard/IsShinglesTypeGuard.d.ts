import AbstractGuard from "./AbstractGuard";
export default class IsShinglesTypeGuard extends AbstractGuard<number> {
    protected property: string;
    protected message: string;
    isValid(value: any): value is number;
}

import AbstractGuard from "./AbstractGuard";
export default class IsShinglesSizeGuard extends AbstractGuard<number> {
    protected property: string;
    protected message: string;
    isValid(value: any): value is number;
}

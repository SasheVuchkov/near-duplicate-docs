export default class MergeSort<T> {
    protected callback: (left: T, right: T) => boolean;
    constructor(callback: (left: T, right: T) => boolean);
    sort(data: T[]): T[];
    protected split(data: T[], aux: T[], low: number, high: number): void;
    protected merge(data: T[], aux: T[], low: number, middle: number, high: number): void;
}

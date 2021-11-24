export default class MergeSort<T> {
    protected callback: (left: T, right: T) => boolean;
    constructor(callback: (left: T, right: T) => boolean);
    sort(data: T[]): T[];
    merge(left: T[] | undefined, right: T[] | undefined): T[];
}

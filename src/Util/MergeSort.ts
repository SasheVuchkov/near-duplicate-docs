export default class MergeSort<T> {
  protected callback: (left: T, right: T) => boolean;

  public constructor(callback: (left: T, right: T) => boolean) {
    this.callback = callback;
  }

  public sort(data: T[]): T[] {
    if (data.length > 1) {
      const middle = Math.floor(data.length / 2);
      return this.merge(
        this.sort(data.slice(0, middle)),
        this.sort(data.slice(middle))
      );
    }

    return data;
  }

  protected merge(left: T[], right: T[]): T[] {
    const result: T[] = [];
    while (left.length > 0 && right.length > 0) {
      if (this.callback(left[0], right[0])) {
        const el = left?.shift() as T;
        el && result.push(el);
      } else {
        const el = right?.shift() as T;
        el && result.push(el);
      }
    }

    return [...result, ...left, ...right];
  }
}

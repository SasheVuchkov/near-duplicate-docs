export default class MergeSort<T> {
  protected callback: (left: T, right: T) => boolean;

  public constructor(callback: (left: T, right: T) => boolean) {
    this.callback = callback;
  }

  public sort(data: T[]): T[] {
    if (data.length > 1) {
      const aux = data.slice(0);
      this.split(data, aux, 0, data.length - 1);
    }

    return data;
  }

  protected split(data: T[], aux: T[], low: number, high: number): void {
    if (high <= low) {
      return;
    }
    const middle = Math.floor(low + (high - low) / 2);
    this.split(data, aux, low, middle);
    this.split(data, aux, middle + 1, high);
    this.merge(data, aux, low, middle, high);
  }

  protected merge(
    data: T[],
    aux: T[],
    low: number,
    middle: number,
    high: number
  ): void {
    for (let n = low; n <= high; n++) {
      aux[n] = data[n];
    }
    let i = low;
    let j = middle + 1;
    for (let n = low; n <= high; n++) {
      if (i > middle) {
        data[n] = aux[j++];
      } else if (j > high) {
        data[n] = aux[i++];
      } else if (this.callback(aux[i], aux[j])) {
        data[n] = aux[i++];
      } else {
        data[n] = aux[j++];
      }
    }
  }
}

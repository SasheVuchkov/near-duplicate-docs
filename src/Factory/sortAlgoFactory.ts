import MergeSort from "../Util/MergeSort";

export const makeMergeSortAlgo = () =>
  new MergeSort<[string, number]>(
    (
      left: [number | string, number],
      right: [number | string, number]
    ): boolean => left[1] < right[1]
  );

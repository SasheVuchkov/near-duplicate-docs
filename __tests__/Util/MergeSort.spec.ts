import MergeSort from "../../src/Util/MergeSort";

describe("Testing Utils/MergeSort class", () => {
  type Data<T> = [string, T[], (left: T, right: T) => boolean, T[]];

  const numbers: Data<number>[] = [
    [
      "Test case: Sorting numbers ASC",
      [5, 6, 6, 8, 9, 2, 1],
      (a: number, b: number): boolean => a < b,
      [1, 2, 5, 6, 6, 8, 9],
    ],
    [
      "Test case: Sorting array of length 1",
      [5],
      (a: number, b: number): boolean => a < b,
      [5],
    ],
    [
      "Test case: Sorting empty array",
      [],
      (a: number, b: number): boolean => a < b,
      [],
    ],
    [
      "Test case: Sorting numbers DESC",
      [1, 3, 12, 13, 9, 2, 5],
      (a: number, b: number) => a > b,
      [13, 12, 9, 5, 3, 2, 1],
    ],
    [
      "Test case: Sorting repeating numbers",
      [3, 3, 3, 3, 3],
      (a: number, b: number): boolean => a < b,
      [3, 3, 3, 3, 3],
    ],
  ];

  test.each(numbers)("%s", (testCase, arr, callback, expected) => {
    const algo = new MergeSort<number>(callback);
    const sorted = algo.sort(arr);
    expect(sorted.length).toEqual(expected.length);

    expected.forEach((val, index) => {
      expect(sorted[index]).toEqual(val);
    });
  });
});

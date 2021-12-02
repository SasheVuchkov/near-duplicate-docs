import {
  StringShinglingTool,
  WordShinglingTool,
  makeWordShinglingTool,
  makeStringShinglingTool,
} from "../../../index";

describe("Testing Factory/shinglingToolFactory", () => {
  test("Test case: Is WordShinglingTool", () => {
    const finder = makeWordShinglingTool(10);
    expect(finder).toBeInstanceOf(WordShinglingTool);
  });

  test("Test case: Is StringShinglingTool", () => {
    const finder = makeStringShinglingTool(10);
    expect(finder).toBeInstanceOf(StringShinglingTool);
  });
});

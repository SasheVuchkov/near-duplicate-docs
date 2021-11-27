import { Shingle } from "../../src/ShinglingTool/ShinglingTool";
import WordShinglingTool from "../../src/ShinglingTool/WordShinglingTool";

describe("Testing ShinglingTool/StringShinglingTool class", () => {
  const tool = new WordShinglingTool(
    3,
    (shingle: string): string | number => shingle
  );

  const data: [string, string, string[]][] = [
    [
      "Test case: String with more words than the shingle length",
      "Not so long ok then.",
      ["Not so long", "so long ok", "long ok then."],
    ],
    [
      "Test case: String with number of words equal the shingle length",
      "Not so long",
      ["Not so long"],
    ],
    [
      "Test case: String with less words than the shingle length",
      "Not so",
      ["Not so"],
    ],
    ["Test case: Empty string", "", []],
  ];

  test.each(data)(
    "%s",
    (testCase: string, text: string, expected: string[]) => {
      const shingles: Shingle[] = [];
      tool.process("randomId", text, (docId: string, shingle: Shingle) => {
        shingles.push(shingle);
      });
      expect(shingles.length).toEqual(expected.length);
      shingles.forEach((sh, index) => {
        expect(sh).toEqual(expected[index]);
      });
    }
  );
});

import StringShinglingTool from "../../../src/ShinglingTool/StringShinglingTool";
import { Shingle } from "../../../src/ShinglingTool/ShinglingTool";

describe("Testing ShinglingTool/StringShinglingTool class", () => {
  const tool = new StringShinglingTool(
    6,
    (shingle: string): string | number => shingle
  );

  const data: [string, string, string[]][] = [
    [
      "Test case: String with length that is bigger than the shingle length",
      "Not so long ",
      ["Not so", "ot so ", "t so l", " so lo", "so lon", "o long", " long "],
    ],
    [
      "Test case: String with length that is equal the shingle length",
      "Not so",
      ["Not so"],
    ],
    [
      "Test case: String with length that is less the shingle length",
      "Not",
      ["Not"],
    ],
    ["Test case: Empty string", "", []],
    [
      "Test case: String with non ascii symbols",
      "Като игра на тронове, ама във ваната",
      [
        "Като и",
        "ато иг",
        "то игр",
        "о игра",
        " игра ",
        "игра н",
        "гра на",
        "ра на ",
        "а на т",
        " на тр",
        "на тро",
        "а трон",
        " троно",
        "тронов",
        "ронове",
        "онове,",
        "нове, ",
        "ове, а",
        "ве, ам",
        "е, ама",
        ", ама ",
        " ама в",
        "ама въ",
        "ма във",
        "а във ",
        " във в",
        "във ва",
        "ъв ван",
        "в вана",
        " ванат",
        "ваната",
      ],
    ],
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

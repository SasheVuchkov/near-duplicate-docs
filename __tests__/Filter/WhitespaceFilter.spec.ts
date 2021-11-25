import WhitespaceFilter from "../../src/Filter/WhitespaceFilter";

describe("Testing WhitespaceFilter class", () => {
  const filter = new WhitespaceFilter();
  const data: [string, string, string][] = [
    [
      "Tabs in string must be replaced with spaces",
      "Some   string  with    whitespaces .",
      "Some string with whitespaces .",
    ],
    [
      "Any non-space whitespace must be replaced with spaces",
      "Some     string \n\r with\nmore\rspaces .",
      "Some string with more spaces .",
    ],
    ["String with no spaces remains unchanged", "Nospaceshere", "Nospaceshere"],
    ["Method doesn't crash when the input is empty string", "", ""],
    ["Method doesn't crash when the input is just spaces", "   ", " "],
  ];

  test.each(data)("Test Case: %s", (testcase, input, expected) => {
    expect(filter.filter(input)).toEqual(expected);
  });
});

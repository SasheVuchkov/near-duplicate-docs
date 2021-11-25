import HtmlTagsFilter from "../../src/Filter/HtmlTagsFilter";

describe('Testing HtmlTagasFilter class', () => {
    const filter = new HtmlTagsFilter();
    const data:[string, string, string][] = [
        ['String with no tags remain the same', 'String with no tags', 'String with no tags'],
        ['Empty string doesn\'t break the method', '', ''],
        ['Any tag in a string is stripped away', 'Any <strong>tag</strong> in <a>a</a> string is <span>stripped</span> away!', 'Any  tag  in  a  string is  stripped  away!'],
    ]

    test.each(data)('Test Case: %s', (testcase, input, expected) => {
        expect(filter.filter(input)).toEqual(expected);
    })
})
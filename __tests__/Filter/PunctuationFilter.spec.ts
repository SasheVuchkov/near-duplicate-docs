import PunctuationFilter from "../../src/Filter/PunctuationFilter";

describe('Testing PunctuationFilter class', () => {
    const filter = new PunctuationFilter();
    const data:[string, string, string][] = [
        ['Strings with no punctuation remain the same', 'String with no punctuation', 'String with no punctuation'],
        ['Any punctuation in a string is replaced with empty string', 'What I love? I love, let\'s say, ice cream.;:{}()[]', 'What I love I love let\'s say ice cream'],
    ]

    test.each(data)('Test Case: %s', (testcase, input, expected) => {
        expect(filter.filter(input)).toEqual(expected);
    })
})
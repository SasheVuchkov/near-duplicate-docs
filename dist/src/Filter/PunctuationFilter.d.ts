export default class PunctuationFilter {
    protected punctuationRegex: RegExp;
    filter: (text: string) => string;
}

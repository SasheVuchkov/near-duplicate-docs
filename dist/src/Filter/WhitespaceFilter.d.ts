export default class WhitespaceFilter {
    protected punctuationRegex: RegExp;
    filter: (text: string) => string;
}

import BaseFilter from "./BaseFilter";
export default class WhitespaceFilter extends BaseFilter {
    protected punctuationRegex: RegExp;
    filter: (text: string) => string;
}

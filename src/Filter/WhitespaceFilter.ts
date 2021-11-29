import BaseFilter from "./BaseFilter";

export default class WhitespaceFilter extends BaseFilter {
  protected punctuationRegex = /[\s]+/gi;
  public filter = (text: string): string => {
    return text.replace(this.punctuationRegex, " ");
  };
}

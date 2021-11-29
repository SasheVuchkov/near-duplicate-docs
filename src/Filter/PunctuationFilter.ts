import BaseFilter from "./BaseFilter";

export default class PunctuationFilter extends BaseFilter {
  protected punctuationRegex = /[.,:;?)!(\][}{"]+/gi;
  public filter = (text: string): string => {
    return text.replace(this.punctuationRegex, "");
  };
}

export default class PunctuationFilter {
  protected punctuationRegex = /[.,:;?)!(\][}{"]+/gi;
  public filter = (text: string): string => {
    return text.replace(this.punctuationRegex, "");
  };
}

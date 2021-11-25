export default class WhitespaceFilter {
  protected punctuationRegex = /[\s]+/gi;
  public filter = (text: string): string => {
    return text.replace(this.punctuationRegex, " ");
  };
}

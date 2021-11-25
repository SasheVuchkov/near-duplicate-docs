import striptags from "striptags";

export default class HtmlTagsFilter {
  public filter = (text: string): string => {
    return striptags(text, [], " ");
  };
}

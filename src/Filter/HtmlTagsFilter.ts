import striptags from "striptags";
import BaseFilter from "./BaseFilter";

export default class HtmlTagsFilter extends BaseFilter {
  public filter = (text: string): string => {
    return striptags(text, [], " ").replace(/\s/gi, " ");
  };
}

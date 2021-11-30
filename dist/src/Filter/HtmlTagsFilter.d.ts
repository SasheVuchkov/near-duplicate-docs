import BaseFilter from "./BaseFilter";
export default class HtmlTagsFilter extends BaseFilter {
    filter: (text: string) => string;
}

import BaseFilter from "../Filter/BaseFilter";
import HtmlTagsFilter from "../Filter/HtmlTagsFilter";
import PunctuationFilter from "../Filter/WhitespaceFilter";
import WhitespaceFilter from "../Filter/PunctuationFilter";
import FilterInterface from "../Filter/FilterInterface";

export const baseFilterFactory = (): FilterInterface => {
    const base = new BaseFilter();
    base.addFilter(new HtmlTagsFilter());
    base.addFilter(new PunctuationFilter());
    base.addFilter(new WhitespaceFilter());

    return base;
}
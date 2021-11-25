import BaseFilter from "../Filter/BaseFilter";
import HtmlTagsFilter from "../Filter/HtmlTagsFilter";
import PunctuationFilter from "../Filter/PunctuationFilter";
import WhitespaceFilter from "../Filter/WhitespaceFilter";
import FilterInterface from "../Filter/FilterInterface";

export const baseFilterFactory = (): FilterInterface => {
    const base = new BaseFilter();
    base.addChild(new HtmlTagsFilter());
    base.addChild(new PunctuationFilter());
    base.addChild(new WhitespaceFilter());

    return base;
}
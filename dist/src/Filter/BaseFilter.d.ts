import FilterInterface from "./FilterInterface";
export default class BaseFilter implements FilterInterface {
    protected children: FilterInterface[];
    addChild: (filter: FilterInterface) => FilterInterface;
    removeChild: (filter: FilterInterface) => FilterInterface;
    filter: (text: string) => string;
    count(): number;
    getChildren(): FilterInterface[];
}

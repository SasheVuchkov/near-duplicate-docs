import FilterInterface from "./FilterInterface";
export default class BaseFilter implements FilterInterface {
    protected filters: FilterInterface[];
    addFilter: (filter: FilterInterface) => FilterInterface;
    removeFilter: (filter: FilterInterface) => FilterInterface;
    filter: (text: string) => string;
}

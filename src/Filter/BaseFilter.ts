import FilterInterface from "./FilterInterface";

export default class BaseFilter implements FilterInterface {
    protected filters: FilterInterface[] = [];

    public addFilter = (filter: FilterInterface): FilterInterface => {
        this.filters.push(filter);
        return this;
    }

    public removeFilter = (filter: FilterInterface): FilterInterface => {
        this.filters = this.filters.filter(flt => flt != filter);
        return this;
    }

    public filter = (text: string): string => {
        this.filters.forEach(flt => {
            text = flt.filter(text);
        })

        return text;
    }
}
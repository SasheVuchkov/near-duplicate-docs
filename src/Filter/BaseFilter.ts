import FilterInterface from "./FilterInterface";

export default class BaseFilter implements FilterInterface {
    protected children: FilterInterface[] = [];

    public addChild = (filter: FilterInterface): FilterInterface => {
        this.children.push(filter);
        return this;
    }

    public removeChild = (filter: FilterInterface): FilterInterface => {
        this.children = this.children.filter(flt => flt != filter);
        return this;
    }

    public filter = (text: string): string => {
        this.children.forEach(flt => {
            text = flt.filter(text);
        })

        return text;
    }

    public count(): number {
        return this.children.length;
    }

    public getChildren(): FilterInterface[] {
        return this.children;
    }
}
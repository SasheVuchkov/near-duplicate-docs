export default interface FilterInterface {
    addChild(filter: FilterInterface): FilterInterface;
    removeChild(filter: FilterInterface): FilterInterface;
    getChildren(): FilterInterface[];
    filter(text: string): string;
    count(): number;
}

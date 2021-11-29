import ShinglingTool, { Shingle } from "./ShinglingTool";
import FilterInterface from "../Filter/FilterInterface";
export declare abstract class BaseShinglingTool implements ShinglingTool {
    protected shingleSize: number;
    protected hasher: (str: string) => Shingle;
    protected filter?: FilterInterface;
    constructor(shingleSize: number, hasher: (str: string) => Shingle, filter?: FilterInterface);
    abstract process(docId: string, text: string, callback: (docId: string, shingle: Shingle) => void): void;
}

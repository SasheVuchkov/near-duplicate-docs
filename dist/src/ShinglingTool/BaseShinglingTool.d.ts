import ShinglingTool, { Shingle } from "./ShinglingTool";
export declare abstract class BaseShinglingTool implements ShinglingTool {
    protected shingleSize: number;
    protected hasher: (str: string) => Shingle;
    constructor(shingleSize: number, hasher: (str: string) => Shingle);
    abstract process(docId: string, text: string, callback: (docId: string, shingle: Shingle) => void): void;
}

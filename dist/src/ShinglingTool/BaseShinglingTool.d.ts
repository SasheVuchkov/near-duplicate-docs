import ShinglingTool from "./ShinglingTool";
export declare abstract class BaseShinglingTool implements ShinglingTool {
    protected shingleSize: number;
    protected hasher: (str: string) => number;
    constructor(shingleSize: number, hasher: (str: string) => number);
    abstract process(docId: string, text: string, callback: (docId: string, shingle: number | string) => void): void;
}

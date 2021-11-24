import ShinglingTool from "./ShinglingTool";

export abstract class BaseShinglingTool implements ShinglingTool {
    protected shingleSize: number;
    protected hasher: (str: string) => number;

    public constructor(shingleSize: number, hasher: (str: string) => number) {
        this.shingleSize = shingleSize;
        this.hasher = hasher;
    }

    public abstract process(docId: string, text: string, callback: (docId: string, shingle: number|string) => void, str?: boolean): Promise<void> ;
}
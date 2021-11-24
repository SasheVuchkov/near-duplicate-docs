import {BaseShinglingTool} from "./BaseShinglingTool";

export default class StringShinglingTool extends BaseShinglingTool{
    public async process(docId: string, text: string, callback: (docId: string, shingle: number) => void): Promise<void>  {
        const items = [...text];
        let startPosition = 0;
        let endPosition = this.shingleSize;


        while (endPosition < items.length) {
            const shingle: number = this.hasher(items.slice(startPosition, endPosition).join(''));
            callback(docId, shingle);
            endPosition += 1;
        }
    }
}
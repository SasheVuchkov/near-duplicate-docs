import { BaseShinglingTool } from "./BaseShinglingTool";
export default class WordShinglingTool extends BaseShinglingTool {
    process(docId: string, text: string, callback: (docId: string, shingle: number | string) => void): void;
}

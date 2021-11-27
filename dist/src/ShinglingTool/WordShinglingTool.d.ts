import { BaseShinglingTool } from "./BaseShinglingTool";
import { Shingle } from "./ShinglingTool";
export default class WordShinglingTool extends BaseShinglingTool {
    process(docId: string, text: string, callback: (docId: string, shingle: Shingle) => void): void;
}

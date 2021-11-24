import { BaseShinglingTool } from "./BaseShinglingTool";
export default class StringShinglingTool extends BaseShinglingTool {
    process(docId: string, text: string, callback: (docId: string, shingle: number) => void): Promise<void>;
}

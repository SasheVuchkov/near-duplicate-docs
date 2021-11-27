export default interface ShinglingTool {
    process(docId: string, text: string, callback: (docId: string, shingle: Shingle) => void): void;
}
export declare type Shingle = number | string;

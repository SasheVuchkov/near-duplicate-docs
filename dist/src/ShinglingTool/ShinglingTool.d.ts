export default interface ShinglingTool {
    process(docId: string, text: string, callback: (docId: string, shingle: number | string) => void, str?: boolean): Promise<void>;
}

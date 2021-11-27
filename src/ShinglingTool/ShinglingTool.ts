export default interface ShinglingTool {
  process(
    docId: string,
    text: string,
    callback: (docId: string, shingle: Shingle) => void
  ): void;
}

export type Shingle = number | string;

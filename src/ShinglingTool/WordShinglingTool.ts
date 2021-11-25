import { BaseShinglingTool } from "./BaseShinglingTool";

export default class WordShinglingTool extends BaseShinglingTool {
  public process(
    docId: string,
    text: string,
    callback: (docId: string, shingle: number | string) => void
  ): void {
    const items = text.split(" ");
    let startPosition = 0;
    let endPosition = this.shingleSize;

    while (endPosition < items.length) {
      const shingle: number | string = this.hasher(
        items.slice(startPosition, endPosition).join(" ")
      );
      callback(docId, shingle);
      startPosition += 1;
      endPosition += 1;
    }
  }
}

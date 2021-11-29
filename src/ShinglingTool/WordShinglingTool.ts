import { BaseShinglingTool } from "./BaseShinglingTool";
import { Shingle } from "./ShinglingTool";

export default class WordShinglingTool extends BaseShinglingTool {
  public process(
    docId: string,
    text: string,
    callback: (docId: string, shingle: Shingle) => void
  ): void {
    text = this.filter ? this.filter.filter(text) : text;
    const items = text.split(" ");
    let startPosition = 0;
    let endPosition = this.shingleSize;
    if (text.length > 0 && items.length < this.shingleSize) {
      callback(docId, text);
      return;
    }
    while (endPosition <= items.length) {
      const shingle: Shingle = this.hasher(
        items.slice(startPosition, endPosition).join(" ")
      );
      callback(docId, shingle);
      startPosition += 1;
      endPosition += 1;
    }
  }
}

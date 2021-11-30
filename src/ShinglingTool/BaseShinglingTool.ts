import ShinglingTool, { Shingle } from "./ShinglingTool";

export abstract class BaseShinglingTool implements ShinglingTool {
  protected shingleSize: number;
  protected hasher: (str: string) => Shingle;

  public constructor(shingleSize: number, hasher: (str: string) => Shingle) {
    this.shingleSize = shingleSize;
    this.hasher = hasher;
  }

  public abstract process(
    docId: string,
    text: string,
    callback: (docId: string, shingle: Shingle) => void
  ): void;
}

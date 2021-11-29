import ShinglingTool, { Shingle } from "./ShinglingTool";
import FilterInterface from "../Filter/FilterInterface";

export abstract class BaseShinglingTool implements ShinglingTool {
  protected shingleSize: number;
  protected hasher: (str: string) => Shingle;
  protected filter?: FilterInterface;

  public constructor(
    shingleSize: number,
    hasher: (str: string) => Shingle,
    filter?: FilterInterface
  ) {
    this.shingleSize = shingleSize;
    this.hasher = hasher;
    this.filter = filter;
  }

  public abstract process(
    docId: string,
    text: string,
    callback: (docId: string, shingle: Shingle) => void
  ): void;
}

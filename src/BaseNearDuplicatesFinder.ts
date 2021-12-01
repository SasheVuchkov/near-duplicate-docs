import { Scores } from "./SimilarityCalculator/SimilarityCalculator";
import { AbstractNearDuplicatesFinder } from "./AbstractNearDuplicatesFinder";

export type Config = { minSimilarity: number };
export type Duplicates = Scores;

export default class BaseNearDuplicatesFinder extends AbstractNearDuplicatesFinder {
  public add(docId: string, text: string): void {
    this.candidatesFinder.add(docId, text);
    this.emit("doc_added", docId);
  }

  public search(): Duplicates {
    this.emit("search");

    const candidates = this.candidatesFinder.search();
    const duplicates = this.process(candidates);

    this.emit("finish", duplicates);
    return duplicates;
  }
}

import { Scores } from "./SimilarityCalculator/SimilarityCalculator";

import { AbstractNearDuplicatesFinder } from "./AbstractNearDuplicatesFinder";

export type Config = { minSimilarity: number };
export type Duplicates = Scores;

export default class AsyncNearDuplicatesFinder extends AbstractNearDuplicatesFinder {
  public add(docId: string, text: string): Promise<void> {
    return new Promise((resolve) => {
      this.candidatesFinder.add(docId, text);
      this.emit("doc_added", docId);
      resolve();
    });
  }

  public search(): Promise<Duplicates> {
    return new Promise((resolve) => {
      this.emit("search");

      const candidates = this.candidatesFinder.search();
      const duplicates = this.process(candidates);

      this.emit("finish", duplicates);
      resolve(duplicates);
    });
  }
}

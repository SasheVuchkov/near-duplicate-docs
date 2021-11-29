import { EventEmitter } from "events";

import { Shingle } from "./ShinglingTool/ShinglingTool";
import CandidateDuplicatesFinder from "./CandidateDuplicatesFinder";

export type Config = { minSimilarity: number };
export type Duplicates = { [id: string]: [number, string][] };

export default class NearDuplicatesFinder extends EventEmitter {
  protected duplicates: Duplicates = {};
  protected config: Config;
  protected errors: any[] = [];
  protected candidatesFinder: CandidateDuplicatesFinder;

  public constructor(
    config: Config,
    candidatesFinder: CandidateDuplicatesFinder
  ) {
    super();
    this.config = config;
    this.candidatesFinder = candidatesFinder;

    this.candidatesFinder.on("found_candidates", (candidates) => {
      this.emit("found_candidates", candidates);
    });

    this.candidatesFinder.on("search", () => {
      this.emit("candidates_search");
    });

    this.candidatesFinder.on("finish", (candidates) => {
      this.emit("end_candidates_search", candidates);
    });
  }

  public add = (docId: string, text: string): void => {
    this.candidatesFinder.add(docId, text);
    this.emit("doc_added", docId);
  };

  public search(): Duplicates {
    this.emit("search");

    const candidates = this.candidatesFinder.search();
    const duplicates = this.process(candidates);

    this.emit("finish", duplicates);
    return duplicates;
  }

  protected process(candidates: string[][]) {
    let docIds: string[] = [];

    candidates.forEach((item) => {
      docIds = docIds.concat(item);
    });

    const docsShingles = this.candidatesFinder.getDocShingles(docIds);

    for (const pair of candidates) {
      this.compare(pair, docsShingles);
    }

    return this.duplicates;
  }

  protected compare(
    docIds: string[],
    shingles: { [docId: string]: [number, Shingle][] }
  ) {
    for (const current of docIds) {
      docIds.shift();

      const currentShingles = shingles[current];

      for (const doc of docIds) {
        if (current === doc) {
          continue;
        }

        const jaccard = this.compareShingles(currentShingles, shingles[doc]);

        if (jaccard >= this.config.minSimilarity) {
          if (typeof this.duplicates[current] === "undefined") {
            this.duplicates[current] = [];
          }
          this.duplicates[current].push([jaccard, doc]);
          this.emit("found_duplicates", [current, doc]);
        }
      }
    }
  }

  protected compareShingles(
    s1: [number, Shingle][],
    s2: [number, Shingle][]
  ): number {
    const similar: (number | string)[] = [];
    const total: (number | string)[] = [];

    for (const tuple of s1) {
      let min = tuple[0];
      let max = tuple[0];
      const s2tuples = s2.filter((t) => t[1] === tuple[1]);
      if (s2tuples.length > 0) {
        min = min < s2tuples[0][0] ? min : s2tuples[0][0];
        max = max > s2tuples[0][0] ? max : s2tuples[0][0];
        for (let i = 1; i <= min; i += 1) {
          similar.push(tuple[1]);
        }
      }

      for (let i = 1; i <= max; i += 1) {
        total.push(tuple[1]);
      }
    }

    for (const tuple of s2) {
      if (!total.includes(tuple[1])) {
        for (let i = 1; i <= tuple[0]; i += 1) {
          total.push(tuple[1]);
        }
      }
    }

    return total.length > 0 ? similar.length / total.length : 0;
  }

  public hasErrors(): boolean {
    return this.errors.length > 0;
  }

  public getErrors(): any[] {
    return this.errors;
  }
}

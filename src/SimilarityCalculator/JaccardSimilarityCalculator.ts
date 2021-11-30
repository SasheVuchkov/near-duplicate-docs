import SimilarityCalculator, { Scores } from "./SimilarityCalculator";
import { Shingle } from "../ShinglingTool/ShinglingTool";

export default class JaccardSimilarityCalculator
  implements SimilarityCalculator
{
  public calculate(
    docIds: string[],
    shingles: { [docId: string]: [number, Shingle][] }
  ): Scores {
    const scores: Scores = {};

    for (const current of docIds) {
      const currentShingles = shingles[current];

      for (const doc of docIds) {
        if (current === doc) {
          continue;
        }

        const jaccard = this.compare(currentShingles, shingles[doc]);

        if (typeof scores[current] === "undefined") {
          scores[current] = [];
        }
        scores[current].push([jaccard, doc]);
      }
    }
    return scores;
  }

  protected compare(s1: [number, Shingle][], s2: [number, Shingle][]): number {
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
}

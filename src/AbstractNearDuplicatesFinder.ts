import CandidatesFinder from "./CandidatesFinder";
import SimilarityCalculator, {
  Scores,
} from "./SimilarityCalculator/SimilarityCalculator";
import { EventEmitter } from "events";

export type Config = { minSimilarity: number };
export type Duplicates = Scores;

export default abstract class AbstractNearDuplicatesFinder extends EventEmitter {
  protected config: Config;
  protected candidatesFinder: CandidatesFinder;
  protected similarityCalculator: SimilarityCalculator;

  public constructor(
    config: Config,
    candidatesFinder: CandidatesFinder,
    similarityCalculator: SimilarityCalculator
  ) {
    super();
    this.config = config;
    this.candidatesFinder = candidatesFinder;
    this.similarityCalculator = similarityCalculator;

    this.candidatesFinder.on("search", () => {
      this.emit("candidates_search");
    });

    this.candidatesFinder.on("finish", (candidates) => {
      this.emit("end_candidates_search", candidates);
    });
  }

  protected process(candidates: string[][]) {
    let docIds: string[] = [];

    candidates.forEach((item) => {
      docIds = docIds.concat(item);
    });

    const docsShingles = this.candidatesFinder.getDocShingles(docIds);

    let scores: Scores = {};
    for (const pair of candidates) {
      const pairScore = this.similarityCalculator.calculate(pair, docsShingles);
      scores = { ...scores, ...pairScore };
      this.emit("score", pairScore);
    }

    for (const score in scores) {
      scores[score] = scores[score].filter(
        (tuple) => this.config.minSimilarity < tuple[0]
      );
    }

    return scores;
  }
}

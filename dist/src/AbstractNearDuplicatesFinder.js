"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class AbstractNearDuplicatesFinder extends events_1.EventEmitter {
    constructor(config, candidatesFinder, similarityCalculator) {
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
    process(candidates) {
        let docIds = [];
        candidates.forEach((item) => {
            docIds = docIds.concat(item);
        });
        const docsShingles = this.candidatesFinder.getDocShingles(docIds);
        let scores = {};
        for (const pair of candidates) {
            const pairScore = this.similarityCalculator.calculate(pair, docsShingles);
            scores = Object.assign(Object.assign({}, scores), pairScore);
            this.emit("score", pairScore);
        }
        for (const score in scores) {
            const temp = scores[score].filter((tuple) => this.config.minSimilarity < tuple[0]);
            delete scores[score];
            if (temp.length > 0) {
                scores[score] = temp;
            }
        }
        return scores;
    }
}
exports.default = AbstractNearDuplicatesFinder;
//# sourceMappingURL=AbstractNearDuplicatesFinder.js.map
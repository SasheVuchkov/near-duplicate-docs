"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class NearDuplicatesFinder extends events_1.EventEmitter {
    constructor(config, candidatesFinder, similarityCalculator) {
        super();
        this.add = (docId, text) => {
            this.candidatesFinder.add(docId, text);
            this.emit("doc_added", docId);
        };
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
    search() {
        this.emit("search");
        const candidates = this.candidatesFinder.search();
        const duplicates = this.process(candidates);
        this.emit("finish", duplicates);
        return duplicates;
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
            scores[score] = scores[score].filter((tuple) => this.config.minSimilarity < tuple[0]);
        }
        return scores;
    }
}
exports.default = NearDuplicatesFinder;
//# sourceMappingURL=NearDuplicatesFinder.js.map
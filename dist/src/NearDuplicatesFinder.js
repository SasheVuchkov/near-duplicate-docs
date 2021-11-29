"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class NearDuplicatesFinder extends events_1.EventEmitter {
    constructor(config, candidatesFinder) {
        super();
        this.duplicates = {};
        this.errors = [];
        this.add = (docId, text) => {
            this.candidatesFinder.add(docId, text);
            this.emit("doc_added", docId);
        };
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
        for (const pair of candidates) {
            this.compare(pair, docsShingles);
        }
        return this.duplicates;
    }
    compare(docIds, shingles) {
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
    compareShingles(s1, s2) {
        const similar = [];
        const total = [];
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
    hasErrors() {
        return this.errors.length > 0;
    }
    getErrors() {
        return this.errors;
    }
}
exports.default = NearDuplicatesFinder;
//# sourceMappingURL=NearDuplicatesFinder.js.map
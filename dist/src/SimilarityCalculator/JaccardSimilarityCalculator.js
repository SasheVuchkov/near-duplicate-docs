"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JaccardSimilarityCalculator {
    calculate(docIds, shingles) {
        const scores = {};
        const index = {};
        for (const current of docIds) {
            const currentShingles = shingles[current];
            for (const doc of docIds) {
                if (current === doc) {
                    continue;
                }
                if (typeof index[doc] === "undefined") {
                    index[doc] = [];
                }
                if (index[current] && index[current].includes(doc)) {
                    continue;
                }
                if (typeof scores[current] === "undefined") {
                    scores[current] = [];
                }
                index[doc].push(current);
                const jaccard = this.compare(currentShingles, shingles[doc]);
                scores[current].push([jaccard, doc]);
            }
        }
        return scores;
    }
    compare(s1, s2) {
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
}
exports.default = JaccardSimilarityCalculator;
//# sourceMappingURL=JaccardSimilarityCalculator.js.map
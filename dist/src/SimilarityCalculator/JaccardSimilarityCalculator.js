"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JaccardSimilarityCalculator {
    calculate(docIds, shingles) {
        const scores = {};
        //Holds an information for already processed pairs
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
                //Let's skip it, if the pair is already processed
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
        for (const shingle in s1) {
            /**
             * The shingle lists are actually list of shingle "bags",
             * so to calculate the index properly, if a shingle appears
             * in both of the lists, then it's appended only the number
             * of times it occurs in their intersection.
             *
             * Later we append it the number of occurrences in their union,
             * when we count the total number of shingles.
             */
            let min = s1[shingle];
            let max = s1[shingle];
            const s2Count = s2[shingle];
            if (s2Count) {
                min = min < s2Count ? min : s2Count;
                max = max > s2Count ? max : s2Count;
                for (let i = 1; i <= min; i += 1) {
                    similar.push(shingle);
                }
            }
            for (let i = 1; i <= max; i += 1) {
                total.push(shingle);
            }
        }
        for (const shingle in s2) {
            if (!total.includes(shingle)) {
                for (let i = 1; i <= s2[shingle]; i += 1) {
                    total.push(shingle);
                }
            }
        }
        return total.length > 0 ? similar.length / total.length : 0;
    }
}
exports.default = JaccardSimilarityCalculator;
//# sourceMappingURL=JaccardSimilarityCalculator.js.map
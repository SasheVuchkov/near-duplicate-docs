"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MergeSort {
    constructor(callback) {
        this.callback = callback;
    }
    sort(data) {
        if (data.length > 1) {
            const middle = Math.floor(data.length / 2);
            return this.merge(data.splice(0, middle), data.splice(middle));
        }
        return data;
    }
    merge(left, right) {
        const result = [];
        if (!left && right) {
            return right;
        }
        if (!right && left) {
            return left;
        }
        if (!right && !left) {
            return result;
        }
        left = left;
        right = right;
        while (left.length > 0 && right.length > 0) {
            if (this.callback(left[0], right[0])) {
                const el = left === null || left === void 0 ? void 0 : left.shift();
                el && result.push(el);
            }
            else {
                const el = right === null || right === void 0 ? void 0 : right.shift();
                el && result.push(el);
            }
        }
        return [...result, ...left, ...right];
    }
}
exports.default = MergeSort;
//# sourceMappingURL=MergeSort.js.map
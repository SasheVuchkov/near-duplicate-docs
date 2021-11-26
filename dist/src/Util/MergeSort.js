"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MergeSort {
    constructor(callback) {
        this.callback = callback;
    }
    sort(data) {
        if (data.length > 1) {
            const aux = data.slice(0);
            this.split(data, aux, 0, data.length - 1);
        }
        return data;
    }
    split(data, aux, low, high) {
        if (high <= low) {
            return;
        }
        const middle = Math.floor(low + (high - low) / 2);
        //Implement async / Promises here / process in parallel
        this.split(data, aux, low, middle);
        this.split(data, aux, middle + 1, high);
        this.merge(data, aux, low, middle, high);
    }
    merge(data, aux, low, middle, high) {
        for (let n = low; n <= high; n++) {
            aux[n] = data[n];
        }
        let i = low;
        let j = middle + 1;
        for (let n = low; n <= high; n++) {
            if (i > middle) {
                data[n] = aux[j++];
            }
            else if (j > high) {
                data[n] = aux[i++];
            }
            else if (this.callback(aux[i], aux[j])) {
                data[n] = aux[i++];
            }
            else {
                data[n] = aux[j++];
            }
        }
    }
}
exports.default = MergeSort;
//# sourceMappingURL=MergeSort.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseFilter {
    constructor() {
        this.filters = [];
        this.addFilter = (filter) => {
            this.filters.push(filter);
            return this;
        };
        this.removeFilter = (filter) => {
            this.filters = this.filters.filter(flt => flt != filter);
            return this;
        };
        this.filter = (text) => {
            this.filters.forEach(flt => {
                text = flt.filter(text);
            });
            return text;
        };
    }
}
exports.default = BaseFilter;
//# sourceMappingURL=BaseFilter.js.map
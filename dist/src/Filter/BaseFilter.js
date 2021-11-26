"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseFilter {
    constructor() {
        this.children = [];
        this.addChild = (filter) => {
            this.children.push(filter);
            return this;
        };
        this.removeChild = (filter) => {
            this.children = this.children.filter((flt) => flt != filter);
            return this;
        };
        this.filter = (text) => {
            this.children.forEach((flt) => {
                text = flt.filter(text);
            });
            return text;
        };
    }
    count() {
        return this.children.length;
    }
    getChildren() {
        return this.children;
    }
}
exports.default = BaseFilter;
//# sourceMappingURL=BaseFilter.js.map
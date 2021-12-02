"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractGuard {
    constructor() {
        this.message = "";
        this.property = "";
    }
    getMessage() {
        return this.message;
    }
    getPropertyName() {
        return this.property;
    }
}
exports.default = AbstractGuard;
//# sourceMappingURL=AbstractGuard.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractGuard_1 = __importDefault(require("./AbstractGuard"));
class ApplicatorGuard extends AbstractGuard_1.default {
    constructor() {
        super(...arguments);
        this.message = "Some of the guards returned false";
        this.guards = [];
    }
    addGuard(guard) {
        this.guards.push(guard);
    }
    isValid(value) {
        value = value;
        let allValid = true;
        this.guards.forEach((guard) => {
            if (!guard.isValid(value[guard.getPropertyName()])) {
                allValid = false;
                this.message = guard.getMessage();
            }
        });
        return allValid;
    }
}
exports.default = ApplicatorGuard;
//# sourceMappingURL=ApplicatorGuard.js.map
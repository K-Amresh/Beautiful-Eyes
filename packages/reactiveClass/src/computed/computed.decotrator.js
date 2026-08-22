"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Computed = Computed;
function Computed() {
    return function (target, context) {
        return function () {
            const value = target.call(this);
            return value;
        };
    };
}

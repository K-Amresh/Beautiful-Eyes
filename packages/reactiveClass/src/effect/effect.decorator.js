"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect = Effect;
function Effect(dependencyFn) {
    return function (target, context) {
        context.addInitializer(function () {
            this.addEffectSubscribers(dependencyFn, context);
        });
        return function (...args) {
            return target.call(this, ...args);
        };
    };
}

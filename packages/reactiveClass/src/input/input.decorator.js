"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = Input;
function runStateChangeSubscribers() {
    this.runSubscribers();
}
// marks a field as receiving its value from a parent component's prop binding ($name=...)
// re-assigning it (done by the parent's View on every reactive pass) refreshes this
// instance's own reactive elements, same as @State does for locally-owned state
function Input() {
    return function Input(target, ctx) {
        ctx.addInitializer(function () {
            let value = this[ctx.name];
            Object.defineProperty(this, ctx.name, {
                get() {
                    return value;
                },
                set(val) {
                    if (value === val)
                        return;
                    value = val;
                    runStateChangeSubscribers.call(this);
                }
            });
        });
        return function (val) {
            return val;
        };
    };
}

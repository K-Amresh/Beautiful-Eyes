"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = State;
const lib_1 = require("@beautiful-eyes/lib");
const taskQueue_1 = require("@beautiful-eyes/lib/src/taskQueue/taskQueue");
const taskQueue = new taskQueue_1.TaskQueue();
function runStateChangeSubscribers() {
    // taskQueue.push({
    //     cb: this.runSubscribers,
    //     context:this,
    // });
    this.runSubscribers();
}
function State() {
    return function State(target, ctx) {
        ctx.addInitializer(function () {
            let value = this[ctx.name];
            // defining accessors
            Object.defineProperty(this, ctx.name, {
                get() {
                    return value;
                },
                set(val) {
                    value = val;
                    runStateChangeSubscribers.call(this);
                    return true;
                }
            });
        });
        return function (val) {
            let t = this;
            return lib_1.Proxify.get(val, ctx.name, this, null, function (path) {
                runStateChangeSubscribers.call(t);
            });
        };
    };
}

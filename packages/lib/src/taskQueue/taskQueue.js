"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskQueue = void 0;
class TaskQueue {
    constructor() {
        this.tasks = new Map();
        this.idleCallbackRunning = false;
        this.performTask = (deadline) => {
            // contextTask contains all the tasks in a component
            // pathTask contains all the tasks dependent on a particular path
            for (let [context, contextTasks] of this.tasks) {
                for (let cb of contextTasks) {
                    if (deadline.timeRemaining() > 0) {
                        this.runTask(context, cb);
                        contextTasks.delete(cb);
                    }
                    else
                        break;
                }
                if (contextTasks.size) {
                    // ie deadline.timeRemaining() is still > 0
                    this.idleCallbackRunning = false;
                    this.runTasksAsIdleCallback();
                    return;
                }
                else {
                    this.tasks.delete(context);
                }
                if (this.tasks.size) {
                    // to schedule new task if still tasks are left
                    this.idleCallbackRunning = false;
                    this.runTasksAsIdleCallback();
                    return;
                }
            }
            // all tasks are completed
            this.idleCallbackRunning = false;
        };
    }
    push(task) {
        let contextTasks = this.tasks.get(task.context);
        if (!contextTasks) {
            contextTasks = new Set();
            this.tasks.set(task.context, contextTasks);
        }
        contextTasks.add(task.cb);
        this.runTasksAsIdleCallback();
    }
    runTask(context, cb) {
        cb.call(context);
    }
    runTasksAsIdleCallback() {
        if (!this.idleCallbackRunning) {
            this.idleCallbackRunning = true;
            requestIdleCallback(this.performTask);
        }
    }
}
exports.TaskQueue = TaskQueue;

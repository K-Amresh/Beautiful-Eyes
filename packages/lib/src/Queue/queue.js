"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const node_1 = require("./node");
class Queue {
    constructor() {
        this.start = null;
        this.end = null;
        this.length = 0;
    }
    push(item) {
        const node = new node_1.Node(item, null, null);
        if (!this.start) {
            this.start = node;
            this.end = node;
            this.length = 1;
        }
        else {
            node.prev = this.end;
            if (this.end)
                this.end.next = node;
            this.end = node;
            this.length++;
        }
    }
    pop() {
        if (!this.start)
            return null;
        const value = this.start.value;
        if (this.start === this.end) {
            this.start = null;
            this.end = null;
        }
        else {
            this.start = this.start.next;
            if (this.start) {
                this.start.prev = null;
            }
        }
        this.length--;
        return value;
    }
}
exports.Queue = Queue;
;

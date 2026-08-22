"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
;
class Node {
    constructor(value, next, prev) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}
exports.Node = Node;
;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const astNode_1 = require("../astNode/astNode");
class For extends astNode_1.astNode {
    constructor(itemVar, indexVar, source, keyFn, body) {
        super();
        this.itemVar = itemVar;
        this.indexVar = indexVar;
        this.source = source;
        this.keyFn = keyFn;
        this.body = body;
    }
    acceptVisitor(visitor) {
        return visitor.visitFor(this);
    }
}
exports.For = For;

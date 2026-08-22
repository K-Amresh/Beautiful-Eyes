"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringNode = void 0;
const astNode_1 = require("../astNode/astNode");
class StringNode extends astNode_1.astNode {
    constructor(content) {
        super();
        this.content = content;
    }
    acceptVisitor(visitor) {
        return visitor.visitStringNode(this);
    }
}
exports.StringNode = StringNode;

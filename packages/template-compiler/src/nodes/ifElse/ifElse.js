"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IfElse = void 0;
const astNode_1 = require("../astNode/astNode");
class IfElse extends astNode_1.astNode {
    constructor(conditions) {
        super();
        this.conditions = conditions;
    }
    acceptVisitor(visitor) {
        return visitor.visitIfElse(this);
    }
}
exports.IfElse = IfElse;

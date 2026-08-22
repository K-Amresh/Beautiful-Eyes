"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ref = void 0;
const astNode_1 = require("../astNode/astNode");
class Ref extends astNode_1.astNode {
    constructor(name) {
        super();
        this.name = name;
    }
    acceptVisitor(visitor) {
        return visitor.visitRef(this);
    }
}
exports.Ref = Ref;

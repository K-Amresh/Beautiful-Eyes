"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpolation = void 0;
const astNode_1 = require("../astNode/astNode");
class Interpolation extends astNode_1.astNode {
    constructor(content) {
        super();
        this.content = content;
    }
    acceptVisitor(visitor) {
        return visitor.visitInterpolation(this);
    }
}
exports.Interpolation = Interpolation;

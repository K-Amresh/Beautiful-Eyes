"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visitor = void 0;
class Visitor {
    constructor() {
        // stack of loop variable names introduced by ancestor @for nodes,
        // used so interpolations compiled inside a loop body can reference
        // them without the implicit `this.` prefix
        this.scopeStack = [];
    }
    pushScope(vars) {
        this.scopeStack.push(vars);
    }
    popScope() {
        this.scopeStack.pop();
    }
    currentScope() {
        return [].concat(...this.scopeStack);
    }
}
exports.Visitor = Visitor;
;

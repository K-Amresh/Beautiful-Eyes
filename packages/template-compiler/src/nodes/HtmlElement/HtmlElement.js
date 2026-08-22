"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlElement = void 0;
const astNode_1 = require("../astNode/astNode");
class HtmlElement extends astNode_1.astNode {
    constructor(tagName, attributes = [], children = [], eventHandlers = [], ref = null, props = []) {
        super();
        this.tagName = tagName;
        this.attributes = attributes;
        this.children = children;
        this.eventHandlers = eventHandlers;
        this.ref = ref;
        this.props = props;
    }
    acceptVisitor(visitor) {
        return visitor.visitHtmlElement(this);
    }
}
exports.HtmlElement = HtmlElement;

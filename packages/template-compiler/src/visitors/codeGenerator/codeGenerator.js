"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeGenerator = void 0;
const visitor_1 = require("../visitor/visitor");
const types_1 = require("../../types/types");
const interpolationTranspiler_1 = __importDefault(require("../../interpolationTranspiler/interpolationTranspiler"));
class CodeGenerator extends visitor_1.Visitor {
    visitHtmlAttribute(htmlAttribute) {
        return {
            attributeName: htmlAttribute.attributeName,
            attributeValue: htmlAttribute.attributeValue.acceptVisitor(this)
        };
    }
    visitHtmlElement(htmlElement) {
        var _a;
        const attributes = {};
        htmlElement.attributes.forEach(attr => {
            const { attributeName, attributeValue } = attr.acceptVisitor(this);
            attributes[attributeName] = attributeValue;
        });
        const props = {};
        htmlElement.props.forEach(attr => {
            const { attributeName, attributeValue } = attr.acceptVisitor(this);
            props[attributeName] = attributeValue;
        });
        const eventHandlers = {};
        htmlElement.eventHandlers.forEach(attr => {
            const { attributeName, attributeValue } = attr.acceptVisitor(this);
            eventHandlers[attributeName] = attributeValue;
        });
        let ref = null;
        if (htmlElement.ref) {
            ref = (_a = htmlElement.ref) === null || _a === void 0 ? void 0 : _a.acceptVisitor(this);
        }
        const children = htmlElement.children.map(child => child.acceptVisitor(this));
        return {
            type: types_1.NODE_OBJ_TYPE.HTML_ELEMENT,
            name: htmlElement.tagName,
            attributes,
            props,
            eventHandlers,
            ref,
            children,
        };
    }
    visitInterpolation(interpolation) {
        const scope = this.currentScope();
        return `function(${scope.join(',')}){return ${(0, interpolationTranspiler_1.default)(interpolation.content, scope)}}`;
    }
    visitStringNode(stringNode) {
        return stringNode.content;
    }
    visitIfElse(ifElse) {
        const nodes = [];
        ifElse.conditions.forEach(([condition, astNodes]) => {
            let n = [];
            astNodes.forEach(node => n.push(node.acceptVisitor(this)));
            nodes.push([condition, n]);
        });
        return {
            type: types_1.NODE_OBJ_TYPE.HTML_ELEMENT,
            directiveName: 'if',
            nodes
        };
    }
    visitFor(forNode) {
        const source = forNode.source.acceptVisitor(this);
        const keyFn = forNode.keyFn ? forNode.keyFn.acceptVisitor(this) : null;
        const scopeVars = forNode.indexVar ? [forNode.indexVar, forNode.itemVar] : [forNode.itemVar];
        this.pushScope(scopeVars);
        const body = forNode.body.map(node => node.acceptVisitor(this));
        this.popScope();
        return {
            type: types_1.NODE_OBJ_TYPE.DIRECTIVE,
            name: 'for',
            itemVar: forNode.itemVar,
            indexVar: forNode.indexVar,
            source,
            keyFn,
            body,
        };
    }
    visitRef(ref) {
        return ref.name;
    }
    eval(nodes) {
        return nodes.map(node => node.acceptVisitor(this));
    }
}
exports.CodeGenerator = CodeGenerator;
;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stringify = void 0;
const visitor_1 = require("../visitor/visitor");
const types_1 = require("../../types/types");
const interpolationTranspiler_1 = __importDefault(require("../../interpolationTranspiler/interpolationTranspiler"));
class Stringify extends visitor_1.Visitor {
    visitHtmlAttribute(htmlAttribute) {
        // quoted key: attribute names can contain characters (e.g. aria-label)
        // that aren't valid in a bare JS object-literal key
        return `${JSON.stringify(htmlAttribute.attributeName)}:${htmlAttribute.attributeValue.acceptVisitor(this)}`;
    }
    visitInterpolation(interpolation) {
        const scope = this.currentScope();
        return `function(${scope.join(',')}){return ${(0, interpolationTranspiler_1.default)(interpolation.content, scope)}},`;
    }
    visitRef(ref) {
        return `${ref.name},`;
    }
    visitStringNode(stringNode) {
        return `"${stringNode.content}",`;
    }
    visitHtmlElement(htmlElement) {
        let str = `{`;
        str += `type: ${types_1.NODE_OBJ_TYPE.HTML_ELEMENT},`;
        str += `name: '${htmlElement.tagName}',`;
        str += `ref: '${htmlElement.ref}',`;
        str += `attributes:{`;
        htmlElement.attributes.forEach(attr => str += `${attr.acceptVisitor(this)}`);
        str += '},';
        str += `props:{`;
        htmlElement.props.forEach(attr => str += `${attr.acceptVisitor(this)}`);
        str += '},';
        str += `eventHandlers:{`;
        htmlElement.eventHandlers.forEach(attr => str += `${attr.acceptVisitor(this)}`);
        str += '},';
        if (htmlElement.ref)
            str += htmlElement.ref.acceptVisitor(this);
        str += 'children: [';
        htmlElement.children.map(child => str += child.acceptVisitor(this));
        str += '],';
        return str += '},';
    }
    visitIfElse(ifElse) {
        let str = `{`;
        str += `type: ${types_1.NODE_OBJ_TYPE.DIRECTIVE},`;
        str += `name: 'ifElse',`;
        str += `children: [`;
        ifElse.conditions.forEach(([condition, astNodes]) => {
            let s = '';
            s += `[${(condition === null || condition === void 0 ? void 0 : condition.acceptVisitor(this)) || 'null,'}`;
            s += `[`;
            astNodes.forEach(node => s += node.acceptVisitor(this));
            s += "]],";
            str += s;
        });
        str += ']';
        return str + `},`;
    }
    visitFor(forNode) {
        let str = `{`;
        str += `type: ${types_1.NODE_OBJ_TYPE.DIRECTIVE},`;
        str += `name: 'for',`;
        str += `itemVar: '${forNode.itemVar}',`;
        str += `indexVar: ${forNode.indexVar ? `'${forNode.indexVar}'` : 'null'},`;
        str += `source: ${forNode.source.acceptVisitor(this)}`;
        str += forNode.keyFn ? `keyFn: ${forNode.keyFn.acceptVisitor(this)}` : `keyFn: null,`;
        const scopeVars = forNode.indexVar ? [forNode.indexVar, forNode.itemVar] : [forNode.itemVar];
        this.pushScope(scopeVars);
        str += `body: [`;
        forNode.body.forEach(node => str += node.acceptVisitor(this));
        str += '],';
        this.popScope();
        return str + `},`;
    }
    eval(nodes) {
        return `[${nodes.map(node => node.acceptVisitor(this))}]`;
    }
}
exports.Stringify = Stringify;
;

import { astNode } from "../../nodes/astNode/astNode";
import { HtmlAttribute } from "../../nodes/HtmlAttribute/HtmlAttribute";
import { HtmlElement } from "../../nodes/HtmlElement/HtmlElement";
import { IfElse } from "../../nodes/ifElse/ifElse";
import { Interpolation } from "../../nodes/interpolation/interpolation";
import { Visitor } from "../visitor/visitor";
import { NODE_OBJ_TYPE } from "../../types/types";
import interpolationTranspiler from "../../interpolationTranspiler/interpolationTranspiler";
import { StringNode } from "../../nodes/string/string";
import { Ref } from "../../nodes/ref/ref.component";
import { For } from "../../nodes/for/for";

export class Stringify extends Visitor{

    visitHtmlAttribute(htmlAttribute: HtmlAttribute ){
        // quoted key: attribute names can contain characters (e.g. aria-label)
        // that aren't valid in a bare JS object-literal key
        return `${JSON.stringify(htmlAttribute.attributeName)}:${htmlAttribute.attributeValue.acceptVisitor(this)}`;
    }

    visitInterpolation(interpolation:Interpolation ){
        const scope = this.currentScope();
        return `function(${scope.join(',')}){return ${interpolationTranspiler(interpolation.content, scope)}},`;
    }

    visitRef(ref: Ref) {
        return `${ref.name},`;
    }

    visitStringNode(stringNode:StringNode){
        return `"${stringNode.content}",`;
    }

    visitHtmlElement(htmlElement:HtmlElement){
        let str = `{`;
        str+=`type: ${NODE_OBJ_TYPE.HTML_ELEMENT},`;
        str+=`name: '${htmlElement.tagName}',`;
        str+=`ref: '${htmlElement.ref}',`;
        str+=`attributes:{`;
        htmlElement.attributes.forEach(attr=>str+=`${attr.acceptVisitor(this)}`);
        str+='},';
        str+=`props:{`;
        htmlElement.props.forEach(attr=>str+=`${attr.acceptVisitor(this)}`);
        str+='},';
        str+=`eventHandlers:{`;
        htmlElement.eventHandlers.forEach(attr=>str+=`${attr.acceptVisitor(this)}`);
        str+='},';
        if(htmlElement.ref) str+= htmlElement.ref.acceptVisitor(this);
        str+='children: [';
        htmlElement.children.map(child=>str+=child.acceptVisitor(this));
        str+='],';
        return str+='},';
    }

    visitIfElse(ifElse:IfElse){
        let str = `{`;
        str+=`type: ${NODE_OBJ_TYPE.DIRECTIVE},`;
        str+=`name: 'ifElse',`;
        str+=`children: [`;
        ifElse.conditions.forEach(([condition, astNodes])=>{
            let s = '';
            s+= `[${condition?.acceptVisitor(this) || 'null,'}`
            s+=`[`;
            astNodes.forEach(node=>s+=node.acceptVisitor(this));
            s+="]],";
            str+=s;
        });
        str+=']';
        return str+`},`;
    }

    visitFor(forNode:For){
        let str = `{`;
        str+=`type: ${NODE_OBJ_TYPE.DIRECTIVE},`;
        str+=`name: 'for',`;
        str+=`itemVar: '${forNode.itemVar}',`;
        str+=`indexVar: ${forNode.indexVar ? `'${forNode.indexVar}'` : 'null'},`;
        str+=`source: ${forNode.source.acceptVisitor(this)}`;
        str+= forNode.keyFn ? `keyFn: ${forNode.keyFn.acceptVisitor(this)}` : `keyFn: null,`;

        const scopeVars = forNode.indexVar ? [forNode.indexVar, forNode.itemVar] : [forNode.itemVar];
        this.pushScope(scopeVars);
        str+=`body: [`;
        forNode.body.forEach(node=>str+=node.acceptVisitor(this));
        str+='],';
        this.popScope();

        return str+`},`;
    }

    eval(nodes:astNode[]){
        return `[${nodes.map(node=>node.acceptVisitor(this))}]`;
    }
};
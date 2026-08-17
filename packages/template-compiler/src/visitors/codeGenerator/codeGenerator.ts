import { AttributeObj, EventHandlerObject } from "@beautiful-eyes/lib";
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

export class CodeGenerator extends Visitor{

    visitHtmlAttribute(htmlAttribute: HtmlAttribute){
        return {
            attributeName:htmlAttribute.attributeName,
            attributeValue: htmlAttribute.attributeValue.acceptVisitor(this)
        }
    }

    visitHtmlElement(htmlElement:HtmlElement){
        const attributes:AttributeObj={};
        htmlElement.attributes.forEach(attr=>{
            const {attributeName, attributeValue} = attr.acceptVisitor(this);
            attributes[attributeName] = attributeValue;
        });

        const eventHandlers:EventHandlerObject={};
        htmlElement.eventHandlers.forEach(attr=>{
            const {attributeName, attributeValue} = attr.acceptVisitor(this);
            eventHandlers[attributeName] = attributeValue as any;
        });

        let ref:any = null;
        if(htmlElement.ref){
            ref = htmlElement.ref?.acceptVisitor(this); 
        }

        const children:any = htmlElement.children.map(child=>child.acceptVisitor(this));

        return {
            type: NODE_OBJ_TYPE.HTML_ELEMENT,
            name: htmlElement.tagName,
            attributes,
            eventHandlers,
            ref,
            children,
        };
    }

    visitInterpolation(interpolation:Interpolation){
        const scope = this.currentScope();
        return `function(${scope.join(',')}){return ${interpolationTranspiler(interpolation.content, scope)}}`;
    }

    visitStringNode(stringNode:StringNode){
        return stringNode.content;
    }

    visitIfElse(ifElse:IfElse){
        const nodes:[Interpolation, astNode[]][] = [];
        ifElse.conditions.forEach(([condition, astNodes])=>{
            let n:any = [];
            astNodes.forEach(node=>n.push(node.acceptVisitor(this)));
            nodes.push([condition, n] as any);
        })
        return {
            type:NODE_OBJ_TYPE.HTML_ELEMENT,
            directiveName:'if',
            nodes
        };
    }

    visitFor(forNode:For){
        const source = forNode.source.acceptVisitor(this);
        const keyFn = forNode.keyFn ? forNode.keyFn.acceptVisitor(this) : null;

        const scopeVars = forNode.indexVar ? [forNode.indexVar, forNode.itemVar] : [forNode.itemVar];
        this.pushScope(scopeVars);
        const body = forNode.body.map(node=>node.acceptVisitor(this));
        this.popScope();

        return {
            type:NODE_OBJ_TYPE.DIRECTIVE,
            name:'for',
            itemVar: forNode.itemVar,
            indexVar: forNode.indexVar,
            source,
            keyFn,
            body,
        };
    }

    visitRef(ref: Ref) {
        return ref.name;
    }

    eval(nodes:astNode[]){
        return nodes.map(node=>node.acceptVisitor(this));
    }
};
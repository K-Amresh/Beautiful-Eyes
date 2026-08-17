import { astNode } from "../../nodes/astNode/astNode";
import { HtmlAttribute } from "../../nodes/HtmlAttribute/HtmlAttribute";
import { HtmlElement } from "../../nodes/HtmlElement/HtmlElement";
import { StringNode } from "../../nodes/string/string";
import { Interpolation } from "../../nodes/interpolation/interpolation";
import { IfElse } from "../../nodes/ifElse/ifElse";
import { Ref } from "../../nodes/ref/ref.component";
import { For } from "../../nodes/for/for";

export abstract class Visitor{
    // stack of loop variable names introduced by ancestor @for nodes,
    // used so interpolations compiled inside a loop body can reference
    // them without the implicit `this.` prefix
    private scopeStack:string[][] = [];

    protected pushScope(vars:string[]){
        this.scopeStack.push(vars);
    }

    protected popScope(){
        this.scopeStack.pop();
    }

    protected currentScope():string[]{
        return ([] as string[]).concat(...this.scopeStack);
    }

    abstract visitHtmlElement(htmlElement:HtmlElement):any;
    abstract visitHtmlAttribute(htmlAttribute:HtmlAttribute):any;
    abstract visitInterpolation(interpolation:Interpolation):string;
    abstract visitStringNode(stringNode:StringNode):any;
    abstract visitIfElse(ifElse:IfElse):any;
    abstract visitFor(forNode:For):any;
    abstract visitRef(ref:Ref):any;
    abstract eval(nodes:astNode[]):any;
};
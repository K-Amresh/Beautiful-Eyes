import { AttributeObj, BE_Node, BE_Nodes, DirectiveObj, EventHandlerObject, ForDirective, HtmlObj, IfElse, Interpolation, NODE_OBJ_TYPE } from "@beautiful-eyes/lib";
import { IComponent } from "../component/component.decorator";
import { ComponentRegistry } from "../component/componentRegistry";

export class View{

    root:(HTMLElement | Text | Comment)[] = [];
    updatorFunctions:{context: IComponent, function:Function[]}[] = [];

    constructor(private component:IComponent, private parentEl:HTMLElement){
        this.root = this.buildNodeTree();
    }

    private get template(){
        return this.component.template;
    }

    private buildNodeTree(template = this.template, args:any[] = []){
        let htmlNodes:(HTMLElement | Text | Comment)[] = [];
        for(let obj of template){
            if(!obj) continue;
            if(typeof obj === 'string') htmlNodes.push(this.buildStringNode(obj));
            else if(typeof obj === 'function') htmlNodes.push(this.buildInterpolationNode(obj, args));
            else if(obj.type === NODE_OBJ_TYPE.HTML_ELEMENT) htmlNodes.push(this.buildHtmlElement(obj, args));
            else if(obj.type === NODE_OBJ_TYPE.DIRECTIVE) htmlNodes.push(this.buildDirectives(obj, args));
        }
        return htmlNodes;
    }

    private buildStringNode(content:string){
        const textNode = document.createTextNode(content);
        return textNode;
    }

    private buildInterpolationNode(interpolation:Interpolation, args:any[] = []){
        const text = interpolation.call(this.component, ...args);
        const textNode = document.createTextNode(text);
        this.component.reactiveElements.set(textNode as any, ()=>{
            textNode.textContent = interpolation.call(this.component, ...args);
        });
        return textNode;
    }

    private buildHtmlElement(HtmlObj:HtmlObj, args:any[] = []){
        const ComponentClass = ComponentRegistry.get(HtmlObj.name);
        if(ComponentClass) return this.buildComponent(HtmlObj, ComponentClass, args);

        const {name:tagName, attributes, children, eventHandlers} = HtmlObj;
        let el = document.createElement(tagName);
        this.addEventListeners(el, eventHandlers, args);
        this.addAttributes(el, attributes, args);
        const childNodes = this.buildNodeTree(HtmlObj.children, args);
        this.appendChildrenToParent(childNodes, el);
        return el;
    }

    private buildComponent(htmlObj:HtmlObj, ComponentClass:new (...args:any[]) => IComponent, args:any[] = []){
        const anchor = document.createComment('component:'+htmlObj.name);
        const instance = new ComponentClass();
        this.applyProps(instance, htmlObj.props, args);
        this.applyProps(instance, htmlObj.eventHandlers, args);

        const nodes = instance.view.root;
        this.setCommentNodeProperty(anchor, 'nodeChild', nodes);
        queueMicrotask(()=>this.appendChildrenToParent(nodes, anchor));

        this.component.reactiveElements.set(anchor as any, ()=>{
            this.applyProps(instance, htmlObj.props, args);
            this.applyProps(instance, htmlObj.eventHandlers, args);
        });
        return anchor;
    }

    private applyProps(instance:any, values:AttributeObj | EventHandlerObject, args:any[]){
        for(let key in values){
            let val:any = (values as any)[key];
            if(typeof val === 'function') val = val.call(this.component, ...args);
            instance[key] = val;
        }
    }

    private addAttributes(el:HTMLElement, attributes:AttributeObj, args:any[] = []){
        const dynamicKeys:string[] = [];
        for(let key in attributes){
            const val = attributes[key];
            if(typeof val === 'function') dynamicKeys.push(key);
            else this.applyAttribute(el, key, val);
        }
        if(!dynamicKeys.length) return;
        const update = () => {
            dynamicKeys.forEach(key=>{
                const val = (attributes[key] as Function).call(this.component, ...args);
                this.applyAttribute(el, key, val);
            });
        };
        update();
        this.component.reactiveElements.set(el as any, update);
    }

    private applyAttribute(el:HTMLElement, key:string, val:any){
        if((el as any)[key]) (el as any)[key] = val;
        else el.setAttribute(key, val as string);
    }

    private addEventListeners(el:HTMLElement, eventHandlers:EventHandlerObject, args:any[] = []){
        for(let key in eventHandlers){
            const handler = eventHandlers[key] as Function;
            let fn = handler.call(this.component, ...args);
            if(typeof fn === 'function') fn = fn.bind(this.component, ...args);
            el.addEventListener(key, fn);
        }
    }

    private buildDirectives(directive:DirectiveObj, args:any[] = []){
        if(directive.name === "ifElse") return this.addIfElseDirective(directive.children, args);
        if(directive.name === "for") return this.addForDirective(directive, args);
        throw new Error('directive decleration not found');
    }

    private addIfElseDirective(children:IfElse, args:any[] = []){
        const comment = document.createComment('if');
        let [lastIndex, nodeRoot] = this.mountIfElseBody(children, args);
        this.setCommentNodeProperty(comment, 'nodeChild', nodeRoot);
        // queue microtask runs before next render and macrotask and io
        // dom is updated till now, but not rendered, so appensing all if-else blocks before rendering
        queueMicrotask(()=>this.appendChildrenToParent(nodeRoot, comment));
        this.component.reactiveElements.set(comment as any, ()=>{
            const currentInterpolationIndex = this.getIfElseTrueConditionIndex(children, args);
            if(currentInterpolationIndex === lastIndex) return;
            nodeRoot.forEach(node=>this.unMountNode(node));
            nodeRoot = this.mountIfElseBodyWithIndex(children, currentInterpolationIndex, args);
            this.setCommentNodeProperty(comment, 'nodeChild', nodeRoot);
            lastIndex = currentInterpolationIndex;
            queueMicrotask(()=>this.appendChildrenToParent(nodeRoot, comment));
        });
        return comment;
    }

    private setCommentNodeProperty(node:Comment, key:string, value:any){
        (node as any)[key] = value;
    }

    private getCommentNodeProperty(node:Comment, key:string){
        return (node as any)[key];
    }

    private getIfElseTrueConditionIndex(ifElse:IfElse, args:any[] = []){
        for(let i = 0; i<ifElse.length; i++){
            const [interpolation, nodeArray] = ifElse[i];
            if(!interpolation || interpolation.call(this.component, ...args)){
                return i;
            }
        }
        return -1;
    }

    private mountIfElseBodyWithIndex(ifElse:IfElse, index:number, args:any[] = []){
        if(index==-1) return [];
        const nodeArray = ifElse[index][1];
        return this.buildNodeTree(nodeArray, args);
    }

    private mountIfElseBody(ifElse:IfElse, args:any[] = []):[number, (HTMLElement | Text | Comment)[]]{
        for(let i = 0; i<ifElse.length; i++){
            const [interpolation, nodeArray] = ifElse[i];
            if(!interpolation || interpolation.call(this.component, ...args)){
                return [i, this.buildNodeTree(nodeArray, args)];
            }
        }
        return [-1, []];
    }

    private addForDirective(directive:ForDirective, args:any[] = []){
        const anchor = document.createComment('for');
        type ForEntry = {comment:Comment, item:any, indexOrKey:any};
        let keyedEntries = new Map<any, ForEntry>();

        const render = () => {
            const sourceVal = directive.source.call(this.component, ...args);
            const entries = this.resolveForEntries(sourceVal);

            const nextKeyedEntries = new Map<any, ForEntry>();
            const orderedComments:Comment[] = [];
            const usedKeys = new Set<any>();

            entries.forEach(([indexOrKey, item])=>{
                const key = this.resolveForKey(directive, item, indexOrKey, args);
                if(usedKeys.has(key)) throw new Error(`duplicate @for key "${key}"`);
                usedKeys.add(key);

                const existing = keyedEntries.get(key);
                if(existing && existing.item === item && existing.indexOrKey === indexOrKey){
                    nextKeyedEntries.set(key, existing);
                    orderedComments.push(existing.comment);
                    return;
                }

                if(existing) this.unMountNode(existing.comment);

                const itemArgs = directive.indexVar ? [...args, indexOrKey, item] : [...args, item];
                const itemComment = document.createComment('for-item');
                const nodes = this.buildNodeTree(directive.body, itemArgs);
                this.setCommentNodeProperty(itemComment, 'nodeChild', nodes);
                nextKeyedEntries.set(key, {comment:itemComment, item, indexOrKey});
                orderedComments.push(itemComment);
            });

            keyedEntries.forEach((entry, key)=>{
                if(!nextKeyedEntries.has(key)) this.unMountNode(entry.comment);
            });

            keyedEntries = nextKeyedEntries;

            queueMicrotask(()=>{
                if(!anchor.parentNode) return;
                let refNode:ChildNode = anchor;
                orderedComments.forEach(comment=>{
                    this.flattenForDisplay(comment).forEach(node=>{
                        if(node.previousSibling !== refNode) refNode.after(node);
                        refNode = node;
                    });
                });
            });
        };

        render();
        this.component.reactiveElements.set(anchor as any, render);
        return anchor;
    }

    private flattenForDisplay(node:HTMLElement | Text | Comment):(HTMLElement | Text | Comment)[]{
        if(node instanceof Comment){
            const children = (this.getCommentNodeProperty(node, 'nodeChild') as (HTMLElement | Text | Comment)[]) || [];
            let flat:(HTMLElement | Text | Comment)[] = [node];
            children.forEach(child=>flat = flat.concat(this.flattenForDisplay(child)));
            return flat;
        }
        return [node];
    }

    private resolveForEntries(sourceVal:any):[any, any][]{
        if(Array.isArray(sourceVal)) return sourceVal.map((item, index)=>[index, item] as [any, any]);
        if(sourceVal && typeof sourceVal === 'object') return Object.keys(sourceVal).map(key=>[key, sourceVal[key]] as [any, any]);
        throw new Error('@for source must be an array or an object');
    }

    private resolveForKey(directive:ForDirective, item:any, indexOrKey:any, args:any[]):any{
        if(!directive.keyFn) return indexOrKey;
        const keyFnRef = directive.keyFn.call(this.component, ...args) as Function;
        return keyFnRef.call(this.component, item, indexOrKey);
    }

    unMountNode(el:HTMLElement | Text | Comment){
        if(el instanceof Comment){
            const nodes = this.getCommentNodeProperty(el, 'nodeChild');
            nodes.forEach((node:any)=>this.unMountNode(node));
        }
        this.removeFromReactiveElements(el);
        el.remove();
    }

    removeFromReactiveElements(el:HTMLElement | Text | Comment){
        if(el.childNodes){
            el.childNodes.forEach(child=>{
                // optimize this
                this.removeFromReactiveElements(child as any);
            });
        }
        this.component.reactiveElements.delete(el as any);
    }

    appendChildrenToParent(children:(HTMLElement | Comment | Text)[], parent:HTMLElement | Comment | Text){
        if(!parent) return children;
        if(parent instanceof Comment){
            // add chidren only when mounted
            if(parent.parentNode){
                let refNode:HTMLElement | Comment | Text = parent;
                children.forEach(child=>{
                    refNode.after(child);
                    refNode = child;
                    if(child instanceof Comment){
                        const nodes = this.getCommentNodeProperty(child, 'nodeChild');
                        this.appendChildrenToParent(nodes, child);
                    }
                });
            }
        }
        else children.forEach(child=>{
            parent.appendChild(child)
        });
        return parent;
    }
}
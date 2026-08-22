"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const lib_1 = require("@beautiful-eyes/lib");
const componentRegistry_1 = require("../component/componentRegistry");
class View {
    constructor(component, parentEl) {
        this.component = component;
        this.parentEl = parentEl;
        this.root = [];
        this.updatorFunctions = [];
        this.root = this.buildNodeTree();
    }
    get template() {
        return this.component.template;
    }
    buildNodeTree(template = this.template, args = []) {
        let htmlNodes = [];
        for (let obj of template) {
            if (!obj)
                continue;
            if (typeof obj === 'string')
                htmlNodes.push(this.buildStringNode(obj));
            else if (typeof obj === 'function')
                htmlNodes.push(this.buildInterpolationNode(obj, args));
            else if (obj.type === lib_1.NODE_OBJ_TYPE.HTML_ELEMENT)
                htmlNodes.push(this.buildHtmlElement(obj, args));
            else if (obj.type === lib_1.NODE_OBJ_TYPE.DIRECTIVE)
                htmlNodes.push(this.buildDirectives(obj, args));
        }
        return htmlNodes;
    }
    buildStringNode(content) {
        const textNode = document.createTextNode(content);
        return textNode;
    }
    buildInterpolationNode(interpolation, args = []) {
        const text = interpolation.call(this.component, ...args);
        const textNode = document.createTextNode(text);
        this.component.reactiveElements.set(textNode, () => {
            textNode.textContent = interpolation.call(this.component, ...args);
        });
        return textNode;
    }
    buildHtmlElement(HtmlObj, args = []) {
        const ComponentClass = componentRegistry_1.ComponentRegistry.get(HtmlObj.name);
        if (ComponentClass)
            return this.buildComponent(HtmlObj, ComponentClass, args);
        const { name: tagName, attributes, children, eventHandlers } = HtmlObj;
        let el = document.createElement(tagName);
        this.addEventListeners(el, eventHandlers, args);
        this.addAttributes(el, attributes, args);
        const childNodes = this.buildNodeTree(HtmlObj.children, args);
        this.appendChildrenToParent(childNodes, el);
        return el;
    }
    buildComponent(htmlObj, ComponentClass, args = []) {
        const anchor = document.createComment('component:' + htmlObj.name);
        const instance = new ComponentClass();
        this.applyProps(instance, htmlObj.props, args);
        this.applyProps(instance, htmlObj.eventHandlers, args);
        const nodes = instance.view.root;
        this.setCommentNodeProperty(anchor, 'nodeChild', nodes);
        queueMicrotask(() => this.appendChildrenToParent(nodes, anchor));
        this.component.reactiveElements.set(anchor, () => {
            this.applyProps(instance, htmlObj.props, args);
            this.applyProps(instance, htmlObj.eventHandlers, args);
        });
        return anchor;
    }
    applyProps(instance, values, args) {
        for (let key in values) {
            let val = values[key];
            if (typeof val === 'function')
                val = val.call(this.component, ...args);
            instance[key] = val;
        }
    }
    addAttributes(el, attributes, args = []) {
        const dynamicKeys = [];
        for (let key in attributes) {
            const val = attributes[key];
            if (typeof val === 'function')
                dynamicKeys.push(key);
            else
                this.applyAttribute(el, key, val);
        }
        if (!dynamicKeys.length)
            return;
        const update = () => {
            dynamicKeys.forEach(key => {
                const val = attributes[key].call(this.component, ...args);
                this.applyAttribute(el, key, val);
            });
        };
        update();
        this.component.reactiveElements.set(el, update);
    }
    applyAttribute(el, key, val) {
        if (el[key])
            el[key] = val;
        else
            el.setAttribute(key, val);
    }
    addEventListeners(el, eventHandlers, args = []) {
        for (let key in eventHandlers) {
            const handler = eventHandlers[key];
            let fn = handler.call(this.component, ...args);
            if (typeof fn === 'function')
                fn = fn.bind(this.component, ...args);
            el.addEventListener(key, fn);
        }
    }
    buildDirectives(directive, args = []) {
        if (directive.name === "ifElse")
            return this.addIfElseDirective(directive.children, args);
        if (directive.name === "for")
            return this.addForDirective(directive, args);
        throw new Error('directive decleration not found');
    }
    addIfElseDirective(children, args = []) {
        const comment = document.createComment('if');
        let [lastIndex, nodeRoot] = this.mountIfElseBody(children, args);
        this.setCommentNodeProperty(comment, 'nodeChild', nodeRoot);
        // queue microtask runs before next render and macrotask and io
        // dom is updated till now, but not rendered, so appensing all if-else blocks before rendering
        queueMicrotask(() => this.appendChildrenToParent(nodeRoot, comment));
        this.component.reactiveElements.set(comment, () => {
            const currentInterpolationIndex = this.getIfElseTrueConditionIndex(children, args);
            if (currentInterpolationIndex === lastIndex)
                return;
            nodeRoot.forEach(node => this.unMountNode(node));
            nodeRoot = this.mountIfElseBodyWithIndex(children, currentInterpolationIndex, args);
            this.setCommentNodeProperty(comment, 'nodeChild', nodeRoot);
            lastIndex = currentInterpolationIndex;
            queueMicrotask(() => this.appendChildrenToParent(nodeRoot, comment));
        });
        return comment;
    }
    setCommentNodeProperty(node, key, value) {
        node[key] = value;
    }
    getCommentNodeProperty(node, key) {
        return node[key];
    }
    getIfElseTrueConditionIndex(ifElse, args = []) {
        for (let i = 0; i < ifElse.length; i++) {
            const [interpolation, nodeArray] = ifElse[i];
            if (!interpolation || interpolation.call(this.component, ...args)) {
                return i;
            }
        }
        return -1;
    }
    mountIfElseBodyWithIndex(ifElse, index, args = []) {
        if (index == -1)
            return [];
        const nodeArray = ifElse[index][1];
        return this.buildNodeTree(nodeArray, args);
    }
    mountIfElseBody(ifElse, args = []) {
        for (let i = 0; i < ifElse.length; i++) {
            const [interpolation, nodeArray] = ifElse[i];
            if (!interpolation || interpolation.call(this.component, ...args)) {
                return [i, this.buildNodeTree(nodeArray, args)];
            }
        }
        return [-1, []];
    }
    addForDirective(directive, args = []) {
        const anchor = document.createComment('for');
        let keyedEntries = new Map();
        const render = () => {
            const sourceVal = directive.source.call(this.component, ...args);
            const entries = this.resolveForEntries(sourceVal);
            const nextKeyedEntries = new Map();
            const orderedComments = [];
            const usedKeys = new Set();
            entries.forEach(([indexOrKey, item]) => {
                const key = this.resolveForKey(directive, item, indexOrKey, args);
                if (usedKeys.has(key))
                    throw new Error(`duplicate @for key "${key}"`);
                usedKeys.add(key);
                const existing = keyedEntries.get(key);
                if (existing && existing.item === item && existing.indexOrKey === indexOrKey) {
                    nextKeyedEntries.set(key, existing);
                    orderedComments.push(existing.comment);
                    return;
                }
                if (existing)
                    this.unMountNode(existing.comment);
                const itemArgs = directive.indexVar ? [...args, indexOrKey, item] : [...args, item];
                const itemComment = document.createComment('for-item');
                const nodes = this.buildNodeTree(directive.body, itemArgs);
                this.setCommentNodeProperty(itemComment, 'nodeChild', nodes);
                nextKeyedEntries.set(key, { comment: itemComment, item, indexOrKey });
                orderedComments.push(itemComment);
            });
            keyedEntries.forEach((entry, key) => {
                if (!nextKeyedEntries.has(key))
                    this.unMountNode(entry.comment);
            });
            keyedEntries = nextKeyedEntries;
            // keep the anchor's own nodeChild in sync so anything that treats
            // this Comment generically (appendChildrenToParent, unMountNode)
            // -- e.g. a @for used directly at a component's top level, with no
            // wrapping element -- knows what is actually mounted under it
            this.setCommentNodeProperty(anchor, 'nodeChild', orderedComments);
            queueMicrotask(() => {
                if (!anchor.parentNode)
                    return;
                let refNode = anchor;
                orderedComments.forEach(comment => {
                    this.flattenForDisplay(comment).forEach(node => {
                        if (node.previousSibling !== refNode)
                            refNode.after(node);
                        refNode = node;
                    });
                });
            });
        };
        render();
        this.component.reactiveElements.set(anchor, render);
        return anchor;
    }
    flattenForDisplay(node) {
        if (node instanceof Comment) {
            const children = this.getCommentNodeProperty(node, 'nodeChild') || [];
            let flat = [node];
            children.forEach(child => flat = flat.concat(this.flattenForDisplay(child)));
            return flat;
        }
        return [node];
    }
    resolveForEntries(sourceVal) {
        if (Array.isArray(sourceVal))
            return sourceVal.map((item, index) => [index, item]);
        if (sourceVal && typeof sourceVal === 'object')
            return Object.keys(sourceVal).map(key => [key, sourceVal[key]]);
        throw new Error('@for source must be an array or an object');
    }
    resolveForKey(directive, item, indexOrKey, args) {
        if (!directive.keyFn)
            return indexOrKey;
        const keyFnRef = directive.keyFn.call(this.component, ...args);
        return keyFnRef.call(this.component, item, indexOrKey);
    }
    unMountNode(el) {
        if (el instanceof Comment) {
            const nodes = this.getCommentNodeProperty(el, 'nodeChild');
            nodes.forEach((node) => this.unMountNode(node));
        }
        this.removeFromReactiveElements(el);
        el.remove();
    }
    removeFromReactiveElements(el) {
        if (el.childNodes) {
            el.childNodes.forEach(child => {
                // optimize this
                this.removeFromReactiveElements(child);
            });
        }
        this.component.reactiveElements.delete(el);
    }
    appendChildrenToParent(children, parent) {
        if (!parent)
            return children;
        if (parent instanceof Comment) {
            // add chidren only when mounted
            if (parent.parentNode) {
                let refNode = parent;
                children.forEach(child => {
                    refNode.after(child);
                    if (child instanceof Comment) {
                        const nodes = this.getCommentNodeProperty(child, 'nodeChild');
                        this.appendChildrenToParent(nodes, child);
                        // a Comment child may have just had its own nested content
                        // spliced in right after it -- continue from the last node
                        // of that expansion, not from the bare anchor itself
                        const flat = this.flattenForDisplay(child);
                        refNode = flat[flat.length - 1];
                    }
                    else {
                        refNode = child;
                    }
                });
            }
        }
        else
            children.forEach(child => {
                parent.appendChild(child);
            });
        return parent;
    }
}
exports.View = View;

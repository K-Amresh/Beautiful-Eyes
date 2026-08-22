"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const HtmlAttribute_1 = require("../nodes/HtmlAttribute/HtmlAttribute");
const HtmlElement_1 = require("../nodes/HtmlElement/HtmlElement");
const ifElse_1 = require("../nodes/ifElse/ifElse");
const for_1 = require("../nodes/for/for");
const interpolation_1 = require("../nodes/interpolation/interpolation");
const ref_component_1 = require("../nodes/ref/ref.component");
const string_1 = require("../nodes/string/string");
const token_1 = require("../token");
class Parser {
    constructor(lexer) {
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
    }
    eat(expectedToken) {
        if (this.currentToken.tokenType === expectedToken) {
            this.currentToken = this.lexer.getNextToken();
        }
        else {
            throw new Error(`expected ${token_1.TOKEN_VALUE[expectedToken]} got ${token_1.TOKEN_VALUE[this.currentToken.tokenType]}`);
        }
    }
    parseAttribute() {
        let isEventListener = false, isRef = false, isProp = false;
        if (this.currentToken.value.startsWith('@')) {
            this.currentToken.value;
            isEventListener = true;
            this.currentToken.value = this.currentToken.value.slice(1);
        }
        else if (this.currentToken.value.startsWith('$')) {
            isProp = true;
            this.currentToken.value = this.currentToken.value.slice(1);
        }
        else if (this.currentToken.tokenType.startsWith('#')) {
            isRef = true;
            this.eat(token_1.TOKEN_TYPE.HASH);
            this.currentToken.value = this.currentToken.value.slice(1);
        }
        const attributeName = this.currentToken.value;
        this.eat(token_1.TOKEN_TYPE.ATTRIBUTE_NAME);
        if (isRef) {
            return new HtmlAttribute_1.HtmlAttribute(attributeName, new ref_component_1.Ref(attributeName), HtmlAttribute_1.ATTRIBUTE_TYPE.REF);
        }
        this.eat(token_1.TOKEN_TYPE.ASSIGNMENT);
        const tagType = isEventListener ? HtmlAttribute_1.ATTRIBUTE_TYPE.EVENT_HANDLER : isProp ? HtmlAttribute_1.ATTRIBUTE_TYPE.PROP : HtmlAttribute_1.ATTRIBUTE_TYPE.VALUE;
        if (this.currentToken.isInterpolation) {
            const content = this.currentToken.value;
            this.eat(token_1.TOKEN_TYPE.ATTRIBUTE_VALUE);
            return new HtmlAttribute_1.HtmlAttribute(attributeName, new interpolation_1.Interpolation(content), tagType);
        }
        else {
            const content = this.currentToken.value;
            this.eat(token_1.TOKEN_TYPE.ATTRIBUTE_VALUE);
            return new HtmlAttribute_1.HtmlAttribute(attributeName, new string_1.StringNode(content), tagType);
        }
    }
    parseTag() {
        this.eat(token_1.TOKEN_TYPE.TAG_OPEN);
        const tagNAme = this.currentToken.value;
        this.eat(token_1.TOKEN_TYPE.TAG_NAME);
        const attributes = [];
        const eventHandlers = [];
        ;
        const props = [];
        let ref = null;
        while (this.currentToken.tokenType !== token_1.TOKEN_TYPE.TAG_CLOSE) {
            if (this.currentToken.tokenType === token_1.TOKEN_TYPE.TAG_CLOSE_SLASH) {
                this.eat(token_1.TOKEN_TYPE.TAG_CLOSE_SLASH);
                this.eat(token_1.TOKEN_TYPE.TAG_CLOSE);
                return new HtmlElement_1.HtmlElement(tagNAme, attributes, [], eventHandlers, null, props);
            }
            const attr = this.parseAttribute();
            if (attr.attributeType === HtmlAttribute_1.ATTRIBUTE_TYPE.EVENT_HANDLER) {
                eventHandlers.push(attr);
            }
            else if (attr.attributeType === HtmlAttribute_1.ATTRIBUTE_TYPE.REF) {
                if (ref)
                    throw new Error('an element can contain only one ref');
                else
                    ref = attr;
            }
            else if (attr.attributeType === HtmlAttribute_1.ATTRIBUTE_TYPE.PROP) {
                props.push(attr);
            }
            else {
                attributes.push(attr);
            }
        }
        this.eat(token_1.TOKEN_TYPE.TAG_CLOSE);
        const children = [];
        children.push(...this.parse('/', 1));
        this.eat(token_1.TOKEN_TYPE.TAG_OPEN);
        this.eat(token_1.TOKEN_TYPE.TAG_CLOSE_SLASH);
        this.eat(token_1.TOKEN_TYPE.TAG_NAME);
        this.eat(token_1.TOKEN_TYPE.TAG_CLOSE);
        return new HtmlElement_1.HtmlElement(tagNAme, attributes, children, eventHandlers, ref, props);
    }
    parseIfElse() {
        const conditions = [];
        // readinf if
        this.eat(token_1.TOKEN_TYPE.IF);
        this.eat(token_1.TOKEN_TYPE.PARENTHESIS_OPEN);
        let interpolation = this.currentToken.value;
        this.eat(token_1.TOKEN_TYPE.INTERPOLATION);
        this.eat(token_1.TOKEN_TYPE.PARENTHESIS_CLOSE);
        this.eat(token_1.TOKEN_TYPE.CURLEY_BRACKET_OPEN);
        let body = this.parse(token_1.TOKEN_TYPE.CURLEY_BRACKET_CLOSE);
        this.eat(token_1.TOKEN_TYPE.CURLEY_BRACKET_CLOSE);
        conditions.push([new interpolation_1.Interpolation(interpolation), body]);
        if (this.currentToken.tokenType !== token_1.TOKEN_TYPE.AT_THE_RATE) {
            return new ifElse_1.IfElse(conditions);
        }
        // reading if-else
        while (this.currentToken.tokenType === token_1.TOKEN_TYPE.AT_THE_RATE && this.lexer.peek(7) === token_1.TOKEN_VALUE[token_1.TOKEN_TYPE.ELSE_IF]) {
            this.eat(token_1.TOKEN_TYPE.AT_THE_RATE);
            this.eat(token_1.TOKEN_TYPE.ELSE_IF);
            this.eat(token_1.TOKEN_TYPE.PARENTHESIS_OPEN);
            const interpolation = this.currentToken.value;
            this.eat(token_1.TOKEN_TYPE.INTERPOLATION);
            this.eat(token_1.TOKEN_TYPE.PARENTHESIS_CLOSE);
            this.eat(token_1.TOKEN_TYPE.CURLEY_BRACKET_OPEN);
            const body = this.parse(token_1.TOKEN_TYPE.CURLEY_BRACKET_CLOSE);
            this.eat(token_1.TOKEN_TYPE.CURLEY_BRACKET_CLOSE);
            conditions.push([new interpolation_1.Interpolation(interpolation), body]);
        }
        if (this.currentToken.tokenType !== token_1.TOKEN_TYPE.AT_THE_RATE || this.lexer.peek(4) !== 'else') {
            return new ifElse_1.IfElse(conditions);
        }
        // reading else
        this.eat(token_1.TOKEN_TYPE.AT_THE_RATE);
        this.eat(token_1.TOKEN_TYPE.ELSE);
        this.eat(token_1.TOKEN_TYPE.CURLEY_BRACKET_OPEN);
        body = this.parse(token_1.TOKEN_TYPE.CURLEY_BRACKET_CLOSE);
        this.eat(token_1.TOKEN_TYPE.CURLEY_BRACKET_CLOSE);
        conditions.push([null, body]);
        return new ifElse_1.IfElse(conditions);
    }
    parseFor() {
        // @for(itemVar : source){}
        // @for(indexVar, itemVar : source; key = trackFn){}
        this.eat(token_1.TOKEN_TYPE.FOR);
        this.eat(token_1.TOKEN_TYPE.PARENTHESIS_OPEN);
        const firstVar = this.currentToken.value;
        this.eat(token_1.TOKEN_TYPE.IDENTIFIER);
        let indexVar = null;
        let itemVar;
        if (this.currentToken.tokenType === token_1.TOKEN_TYPE.COMMA) {
            this.eat(token_1.TOKEN_TYPE.COMMA);
            indexVar = firstVar;
            itemVar = this.currentToken.value;
            this.eat(token_1.TOKEN_TYPE.IDENTIFIER);
        }
        else {
            itemVar = firstVar;
        }
        this.eat(token_1.TOKEN_TYPE.COLON);
        const sourceContent = this.currentToken.value;
        this.eat(token_1.TOKEN_TYPE.INTERPOLATION);
        const source = new interpolation_1.Interpolation(sourceContent);
        let keyFn = null;
        if (this.currentToken.tokenType === token_1.TOKEN_TYPE.SEMICOLON) {
            this.eat(token_1.TOKEN_TYPE.SEMICOLON);
            const clauseName = this.currentToken.value;
            this.eat(token_1.TOKEN_TYPE.IDENTIFIER);
            if (clauseName !== 'key')
                throw new Error(`expected 'key' got '${clauseName}'`);
            this.eat(token_1.TOKEN_TYPE.ASSIGNMENT);
            const keyContent = this.currentToken.value;
            this.eat(token_1.TOKEN_TYPE.INTERPOLATION);
            keyFn = new interpolation_1.Interpolation(keyContent);
        }
        this.eat(token_1.TOKEN_TYPE.PARENTHESIS_CLOSE);
        this.eat(token_1.TOKEN_TYPE.CURLEY_BRACKET_OPEN);
        const body = this.parse(token_1.TOKEN_TYPE.CURLEY_BRACKET_CLOSE);
        this.eat(token_1.TOKEN_TYPE.CURLEY_BRACKET_CLOSE);
        return new for_1.For(itemVar, indexVar, source, keyFn, body);
    }
    parseSwitch() {
    }
    parsePortal() {
    }
    parseStructuralDirective() {
        if (!(this.currentToken.tokenType === token_1.TOKEN_TYPE.AT_THE_RATE)) {
            throw new Error(`expected @ gor ${this.currentToken.value}`);
        }
        this.eat(token_1.TOKEN_TYPE.AT_THE_RATE);
        switch (this.currentToken.tokenType) {
            case token_1.TOKEN_TYPE.IF: return this.parseIfElse();
            case token_1.TOKEN_TYPE.FOR: return this.parseFor();
            case token_1.TOKEN_TYPE.SWITCH: return this.parseSwitch();
            case token_1.TOKEN_TYPE.ELSE_IF: throw new Error('@else-if needs a parent @if statement');
            case token_1.TOKEN_TYPE.ELSE: throw new Error('@else needs a parent @if or @else-if statement');
            case token_1.TOKEN_TYPE.CASE: throw new Error('@case needs a parent @switch statement');
        }
    }
    parse(delimeter = token_1.TOKEN_TYPE.END_OF_FILE, peek = -1) {
        const nodes = [];
        while (peek > -1 ? this.lexer.peek(peek) !== delimeter : this.currentToken.tokenType !== delimeter) {
            switch (this.currentToken.tokenType) {
                case token_1.TOKEN_TYPE.AT_THE_RATE:
                    nodes.push(this.parseStructuralDirective());
                    break;
                case token_1.TOKEN_TYPE.STRING:
                    this.currentToken.value && nodes.push(new string_1.StringNode(this.currentToken.value));
                    this.eat(token_1.TOKEN_TYPE.STRING);
                    break;
                case token_1.TOKEN_TYPE.INTERPOLATION:
                    this.currentToken.value && nodes.push(new interpolation_1.Interpolation(this.currentToken.value));
                    this.eat(token_1.TOKEN_TYPE.INTERPOLATION);
                    break;
                case token_1.TOKEN_TYPE.TAG_OPEN:
                    nodes.push(this.parseTag());
                    break;
                default:
                    throw new Error('undefined token ' + this.currentToken.value);
            }
        }
        return nodes;
    }
}
exports.Parser = Parser;

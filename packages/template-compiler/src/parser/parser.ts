import { Lexer } from "../lexer/lexer";
import { astNode } from "../nodes/astNode/astNode";
import { ATTRIBUTE_TYPE, HtmlAttribute } from "../nodes/HtmlAttribute/HtmlAttribute";
import { HtmlChild } from "../nodes/HtmlChild/htmlChild";
import { HtmlElement } from "../nodes/HtmlElement/HtmlElement";
import { IfElse, IfElseConditions } from "../nodes/ifElse/ifElse";
import { For } from "../nodes/for/for";
import { Interpolation } from "../nodes/interpolation/interpolation";
import { Ref } from "../nodes/ref/ref.component";
import { StringNode } from "../nodes/string/string";
import { Token, TOKEN_TYPE, TOKEN_VALUE } from "../token";

export class Parser {
    currentToken: Token;
    constructor(
        private lexer: Lexer
    ) {
        this.currentToken = this.lexer.getNextToken();
    }

    eat(expectedToken: TOKEN_TYPE) {
        if (this.currentToken.tokenType === expectedToken) {
            this.currentToken = this.lexer.getNextToken();
        }
        else {
            throw new Error(`expected ${TOKEN_VALUE[expectedToken]} got ${TOKEN_VALUE[this.currentToken.tokenType]}`);
        }
    }

    parseAttribute() {
        let isEventListener = false, isRef = false, isProp = false;
        if (this.currentToken.value.startsWith('@')) {
            this.currentToken.value
            isEventListener = true;
            this.currentToken.value = this.currentToken.value.slice(1);
        }
        else if (this.currentToken.value.startsWith('$')) {
            isProp = true;
            this.currentToken.value = this.currentToken.value.slice(1);
        }
        else if (this.currentToken.tokenType.startsWith('#')) {
            isRef = true;
            this.eat(TOKEN_TYPE.HASH);
            this.currentToken.value = this.currentToken.value.slice(1);
        }
        const attributeName = this.currentToken.value;
        this.eat(TOKEN_TYPE.ATTRIBUTE_NAME);
        if (isRef) {
            return new HtmlAttribute(attributeName, new Ref(attributeName), ATTRIBUTE_TYPE.REF);
        }
        this.eat(TOKEN_TYPE.ASSIGNMENT);
        const tagType = isEventListener ? ATTRIBUTE_TYPE.EVENT_HANDLER : isProp ? ATTRIBUTE_TYPE.PROP : ATTRIBUTE_TYPE.VALUE;
        if (this.currentToken.isInterpolation) {
            const content = this.currentToken.value;
            this.eat(TOKEN_TYPE.ATTRIBUTE_VALUE);
            return new HtmlAttribute(attributeName, new Interpolation(content), tagType);
        }
        else{
            const content = this.currentToken.value;
            this.eat(TOKEN_TYPE.ATTRIBUTE_VALUE);
            return new HtmlAttribute(attributeName, new StringNode(content), tagType);
        }
    }

    parseTag() {
        this.eat(TOKEN_TYPE.TAG_OPEN);
        const tagNAme = this.currentToken.value;
        this.eat(TOKEN_TYPE.TAG_NAME);
        const attributes: HtmlAttribute[] = [];
        const eventHandlers: HtmlAttribute[] = [];;
        const props: HtmlAttribute[] = [];
        let ref: HtmlAttribute | null = null;
        while (this.currentToken.tokenType !== TOKEN_TYPE.TAG_CLOSE) {
            const attr = this.parseAttribute();
            if (attr.attributeType === ATTRIBUTE_TYPE.EVENT_HANDLER) {
                eventHandlers.push(attr);
            }
            else if (attr.attributeType === ATTRIBUTE_TYPE.REF) {
                if (ref) throw new Error('an element can contain only one ref');
                else ref = attr;
            }
            else if (attr.attributeType === ATTRIBUTE_TYPE.PROP) {
                props.push(attr);
            }
            else {
                attributes.push(attr);
            }
            if (this.currentToken.tokenType === TOKEN_TYPE.TAG_CLOSE_SLASH) {
                this.eat(TOKEN_TYPE.TAG_CLOSE_SLASH);
                this.eat(TOKEN_TYPE.TAG_CLOSE);
                return new HtmlElement(tagNAme, attributes, [], eventHandlers, null, props);
            }
        }
        this.eat(TOKEN_TYPE.TAG_CLOSE);
        const children: HtmlChild[] = [];
        children.push(...this.parse('/', 1) as any);
        this.eat(TOKEN_TYPE.TAG_OPEN)
        this.eat(TOKEN_TYPE.TAG_CLOSE_SLASH);
        this.eat(TOKEN_TYPE.TAG_NAME);
        this.eat(TOKEN_TYPE.TAG_CLOSE);
        return new HtmlElement(tagNAme, attributes, children, eventHandlers, ref, props);
    }

    parseIfElse() {
        const conditions: IfElseConditions = [];
        // readinf if
        this.eat(TOKEN_TYPE.IF);
        this.eat(TOKEN_TYPE.PARENTHESIS_OPEN);
        let interpolation = this.currentToken.value;
        this.eat(TOKEN_TYPE.INTERPOLATION);
        this.eat(TOKEN_TYPE.PARENTHESIS_CLOSE);
        this.eat(TOKEN_TYPE.CURLEY_BRACKET_OPEN);
        let body = this.parse(TOKEN_TYPE.CURLEY_BRACKET_CLOSE);
        this.eat(TOKEN_TYPE.CURLEY_BRACKET_CLOSE);
        conditions.push([new Interpolation(interpolation), body]);

        if (this.currentToken.tokenType !== TOKEN_TYPE.AT_THE_RATE) {
            return new IfElse(conditions);
        }

        // reading if-else
        while ((this.currentToken.tokenType as any) === TOKEN_TYPE.AT_THE_RATE && this.lexer.peek(7) === TOKEN_VALUE[TOKEN_TYPE.ELSE_IF]) {
            this.eat(TOKEN_TYPE.AT_THE_RATE)
            this.eat(TOKEN_TYPE.ELSE_IF);
            this.eat(TOKEN_TYPE.PARENTHESIS_OPEN);
            const interpolation = this.currentToken.value;
            this.eat(TOKEN_TYPE.INTERPOLATION);
            this.eat(TOKEN_TYPE.PARENTHESIS_CLOSE);
            this.eat(TOKEN_TYPE.CURLEY_BRACKET_OPEN);
            const body = this.parse(TOKEN_TYPE.CURLEY_BRACKET_CLOSE);
            this.eat(TOKEN_TYPE.CURLEY_BRACKET_CLOSE);
            conditions.push([new Interpolation(interpolation), body]);
        }

        if (this.currentToken.tokenType !== TOKEN_TYPE.AT_THE_RATE || this.lexer.peek(4) !== 'else') {
            return new IfElse(conditions);
        }

        // reading else
        this.eat(TOKEN_TYPE.AT_THE_RATE);
        this.eat(TOKEN_TYPE.ELSE);
        this.eat(TOKEN_TYPE.CURLEY_BRACKET_OPEN);
        body = this.parse(TOKEN_TYPE.CURLEY_BRACKET_CLOSE);
        this.eat(TOKEN_TYPE.CURLEY_BRACKET_CLOSE);
        conditions.push([null, body]);
        return new IfElse(conditions);
    }

    parseFor() {
        // @for(itemVar : source){}
        // @for(indexVar, itemVar : source; key = trackFn){}
        this.eat(TOKEN_TYPE.FOR);
        this.eat(TOKEN_TYPE.PARENTHESIS_OPEN);

        const firstVar = this.currentToken.value;
        this.eat(TOKEN_TYPE.IDENTIFIER);

        let indexVar: string | null = null;
        let itemVar: string;
        if ((this.currentToken.tokenType as any) === TOKEN_TYPE.COMMA) {
            this.eat(TOKEN_TYPE.COMMA);
            indexVar = firstVar;
            itemVar = this.currentToken.value;
            this.eat(TOKEN_TYPE.IDENTIFIER);
        }
        else {
            itemVar = firstVar;
        }

        this.eat(TOKEN_TYPE.COLON);
        const sourceContent = this.currentToken.value;
        this.eat(TOKEN_TYPE.INTERPOLATION);
        const source = new Interpolation(sourceContent);

        let keyFn: Interpolation | null = null;
        if ((this.currentToken.tokenType as any) === TOKEN_TYPE.SEMICOLON) {
            this.eat(TOKEN_TYPE.SEMICOLON);
            const clauseName = this.currentToken.value;
            this.eat(TOKEN_TYPE.IDENTIFIER);
            if (clauseName !== 'key') throw new Error(`expected 'key' got '${clauseName}'`);
            this.eat(TOKEN_TYPE.ASSIGNMENT);
            const keyContent = this.currentToken.value;
            this.eat(TOKEN_TYPE.INTERPOLATION);
            keyFn = new Interpolation(keyContent);
        }

        this.eat(TOKEN_TYPE.PARENTHESIS_CLOSE);
        this.eat(TOKEN_TYPE.CURLEY_BRACKET_OPEN);
        const body = this.parse(TOKEN_TYPE.CURLEY_BRACKET_CLOSE);
        this.eat(TOKEN_TYPE.CURLEY_BRACKET_CLOSE);

        return new For(itemVar, indexVar, source, keyFn, body);
    }

    parseSwitch() {

    }

    parsePortal() {

    }

    parseStructuralDirective(): any {
        if (!(this.currentToken.tokenType === TOKEN_TYPE.AT_THE_RATE)) {
            throw new Error(`expected @ gor ${this.currentToken.value}`);
        }
        this.eat(TOKEN_TYPE.AT_THE_RATE);
        switch (this.currentToken.tokenType as any) {
            case TOKEN_TYPE.IF: return this.parseIfElse();
            case TOKEN_TYPE.FOR: return this.parseFor();
            case TOKEN_TYPE.SWITCH: return this.parseSwitch();
            case TOKEN_TYPE.ELSE_IF: throw new Error('@else-if needs a parent @if statement');
            case TOKEN_TYPE.ELSE: throw new Error('@else needs a parent @if or @else-if statement');
            case TOKEN_TYPE.CASE: throw new Error('@case needs a parent @switch statement');
        }
    }

    parse(delimeter:TOKEN_TYPE | string = TOKEN_TYPE.END_OF_FILE, peek=-1): astNode[] {
        const nodes: astNode[] = [];
        while (peek>-1 ? this.lexer.peek(peek)!==delimeter :  this.currentToken.tokenType !== delimeter) {
            switch (this.currentToken.tokenType) {
                case TOKEN_TYPE.AT_THE_RATE:
                    nodes.push(this.parseStructuralDirective());
                    break;
                case TOKEN_TYPE.STRING:
                    this.currentToken.value && nodes.push(new StringNode(this.currentToken.value));
                    this.eat(TOKEN_TYPE.STRING);
                    break;
                case TOKEN_TYPE.INTERPOLATION:
                    this.currentToken.value && nodes.push(new Interpolation(this.currentToken.value));
                    this.eat(TOKEN_TYPE.INTERPOLATION);
                    break;
                case TOKEN_TYPE.TAG_OPEN:
                    nodes.push(this.parseTag());
                    break;
                default:
                    throw new Error('undefined token ' + this.currentToken.value);
            }
        }
        return nodes;
    }
}
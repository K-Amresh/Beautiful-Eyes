"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = void 0;
const token_1 = require("../token");
const util_1 = require("./util");
class Lexer {
    constructor(source) {
        this.source = source;
        this.currentPosition = 0;
        this.prevToken = token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.START_OF_FILE);
        this.insideForHeader = false;
    }
    peek(position = 1) {
        return this.source.substring(this.currentPosition, this.currentPosition + position);
    }
    advance(jump = 1) {
        this.currentPosition += jump;
    }
    skipWhitespace() {
        while (this.currentPosition < this.source.length && (this.currentChar === ' ' || this.currentChar === '')) {
            this.advance();
        }
    }
    skipNextLine() {
        while (this.currentPosition < this.source.length && (['\n', '\t', '\r', '\r\n'].includes(this.currentChar))) {
            this.advance();
        }
    }
    skipSkipable() {
        this.skipNextLine();
        this.skipWhitespace();
    }
    get currentChar() {
        return this.source[this.currentPosition];
    }
    getNextToken() {
        this.skipSkipable();
        if (this.currentChar === '\n') {
            this.skipSkipable();
        }
        if (this.currentPosition >= this.source.length) {
            return token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.END_OF_FILE);
        }
        if (this.insideForHeader) {
            return this.getNextForHeaderToken();
        }
        switch (this.currentChar) {
            case '<':
                this.advance();
                return this.prevToken = token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.TAG_OPEN);
            case '>':
                this.advance();
                return this.prevToken = token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.TAG_CLOSE);
            case '/':
                this.advance();
                return this.prevToken = token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.TAG_CLOSE_SLASH);
            case '=':
                this.advance();
                return this.prevToken = token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.ASSIGNMENT);
            case '@':
                if ([token_1.TOKEN_TYPE.ATTRIBUTE_NAME, token_1.TOKEN_TYPE.ATTRIBUTE_VALUE, token_1.TOKEN_TYPE.TAG_NAME].includes(this.prevToken.tokenType)) {
                    return this.prevToken = this.readAttributeName();
                }
                this.advance();
                return this.prevToken = token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.AT_THE_RATE);
            // case '#':
            //     this.advance();
            //     return this.prevToken = TokenFactory.createFromType(TOKEN_TYPE.HASH);
            case '$':
                if ([token_1.TOKEN_TYPE.ATTRIBUTE_NAME, token_1.TOKEN_TYPE.ATTRIBUTE_VALUE, token_1.TOKEN_TYPE.TAG_NAME].includes(this.prevToken.tokenType)) {
                    return this.prevToken = this.readAttributeName();
                }
                this.advance();
                return this.prevToken = token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.DOLLAR);
            case '(':
                if (this.prevToken.tokenType === token_1.TOKEN_TYPE.FOR)
                    this.insideForHeader = true;
                this.advance();
                return this.prevToken = token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.PARENTHESIS_OPEN);
            case ')':
                this.advance();
                return this.prevToken = token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.PARENTHESIS_CLOSE);
            case '{':
                if ([token_1.TOKEN_TYPE.PARENTHESIS_CLOSE, token_1.TOKEN_TYPE.ELSE].includes(this.prevToken.tokenType)) {
                    // ie a block node, eg if(condition){ <- , else{ <-, else-if(condition){ <- 
                    this.advance();
                    return this.prevToken = token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.CURLEY_BRACKET_OPEN);
                }
                else if (this.prevToken.tokenType === token_1.TOKEN_TYPE.ASSIGNMENT)
                    return this.prevToken = this.readAttributeValue();
                return this.prevToken = token_1.TokenFactory.createFromTypeAndValue(token_1.TOKEN_TYPE.INTERPOLATION, this.readJSXInterpolation(), true);
            case '}':
                this.advance();
                return this.prevToken = token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.CURLEY_BRACKET_CLOSE);
            // case "'":
            //     this.advance();
            //     return this.prevToken = TokenFactory.createFromType(TOKEN_TYPE.SINGLE_QUOTE);
            // case '"':
            //     this.advance();
            //     return this.prevToken = TokenFactory.createFromType(TOKEN_TYPE.DOUBLE_QUOTE);
            default:
                switch (this.prevToken.tokenType) {
                    case token_1.TOKEN_TYPE.TAG_CLOSE_SLASH:
                    case token_1.TOKEN_TYPE.TAG_OPEN: return this.prevToken = this.readTagName();
                    case token_1.TOKEN_TYPE.TAG_NAME: return this.prevToken = this.readAttributeName();
                    case token_1.TOKEN_TYPE.ATTRIBUTE_VALUE:
                    case token_1.TOKEN_TYPE.ATTRIBUTE_NAME: return this.prevToken = this.readAttributeName(); // <tag attr1 attr=attrval attr2/>
                    case token_1.TOKEN_TYPE.ASSIGNMENT: return this.prevToken = this.readAttributeValue();
                    case token_1.TOKEN_TYPE.AT_THE_RATE: return this.prevToken = this.readStructuralDirectives();
                    case token_1.TOKEN_TYPE.PARENTHESIS_OPEN: return this.prevToken = token_1.TokenFactory.createFromTypeAndValue(token_1.TOKEN_TYPE.INTERPOLATION, this.readJSXInterpolation('('), true);
                }
                if ((0, util_1.isText)(this.currentChar)) {
                    return token_1.TokenFactory.createFromTypeAndValue(token_1.TOKEN_TYPE.STRING, this.readText());
                }
                const currToken = this.currentChar;
                console.log({ source: this.currentChar, pos: this.currentPosition });
                throw new Error(`unidentified token "${currToken}"`);
        }
    }
    readTagName() {
        if (!this.currentChar)
            throw new Error(`tag name required <`);
        if (!(/^[a-zA-Z]$/.test(this.currentChar)))
            throw new Error(`tag name should start from an alphabet`);
        let str = this.currentChar;
        this.advance();
        while (this.currentPosition < this.source.length && ![' ', '>'].includes(this.currentChar)) {
            if (!(/^[a-zA-Z0-9_]*/.test(this.currentChar)))
                throw new Error(`tag name can only contain letters, digits and underscore`);
            str += this.currentChar;
            this.advance();
        }
        if (this.currentPosition >= this.source.length)
            throw new Error(`you forgot to close tag <${str}`);
        return token_1.TokenFactory.createFromTypeAndValue(token_1.TOKEN_TYPE.TAG_NAME, str);
    }
    readAttributeName() {
        if (!this.currentChar)
            throw new Error(`please provide attribute or close the tag`);
        if (['@', '#', '$'].includes(this.currentChar)) {
            if (!(/^[a-zA-Z]$/.test(this.source[this.currentPosition + 1])))
                throw new Error(`attriute name should start from an alphabet`);
        }
        else if (!(/^[a-zA-Z]$/.test(this.currentChar))) {
            throw new Error(`attriute name should start from an alphabet`);
        }
        let str = this.currentChar;
        this.advance();
        while (this.currentPosition < this.source.length && ![' ', '='].includes(this.currentChar)) {
            if (!(/^[a-zA-Z0-9_]*/.test(this.currentChar)))
                throw new Error(`attribute name can only contain letters, digits and underscore`);
            str += this.currentChar;
            this.advance();
        }
        if (this.currentPosition >= this.source.length)
            throw new Error(`you forgot to close tag <${str}`);
        return token_1.TokenFactory.createFromTypeAndValue(token_1.TOKEN_TYPE.ATTRIBUTE_NAME, str);
    }
    readAttributeValue() {
        if (!this.currentChar)
            throw new Error(`you forgot to provide attribute value`);
        if (this.currentChar === token_1.TOKEN_VALUE[token_1.TOKEN_TYPE.CURLEY_BRACKET_OPEN])
            return token_1.TokenFactory.createFromTypeAndValue(token_1.TOKEN_TYPE.ATTRIBUTE_VALUE, this.readJSXInterpolation(), true);
        else if (['"', "'"].includes(this.currentChar)) {
            return token_1.TokenFactory.createFromTypeAndValue(token_1.TOKEN_TYPE.ATTRIBUTE_VALUE, this.readString());
        }
        else
            throw new Error("attribute value should be a string or an interpolation");
    }
    readStructuralDirectives() {
        if ((0, util_1.isText)(this.currentChar)) {
            const text = this.readStructuralDirectiveIdentifire();
            switch (text) {
                case token_1.TOKEN_VALUE[token_1.TOKEN_TYPE.FOR]: return token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.FOR);
                case token_1.TOKEN_VALUE[token_1.TOKEN_TYPE.SWITCH]: return token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.SWITCH);
                case token_1.TOKEN_VALUE[token_1.TOKEN_TYPE.CASE]: return token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.CASE);
                case token_1.TOKEN_VALUE[token_1.TOKEN_TYPE.IF]: return token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.IF);
                case token_1.TOKEN_VALUE[token_1.TOKEN_TYPE.ELSE_IF]: return token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.ELSE_IF);
                case token_1.TOKEN_VALUE[token_1.TOKEN_TYPE.ELSE]: return token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.ELSE);
                default: throw new Error(`expected structural directive, got ${text}`);
            }
        }
        else {
            throw new Error(`expected text, got ${this.currentChar}`);
        }
    }
    getNextForHeaderToken() {
        switch (this.currentChar) {
            case ',':
                this.advance();
                return this.prevToken = token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.COMMA);
            case ':':
                this.advance();
                return this.prevToken = token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.COLON);
            case ';':
                this.advance();
                return this.prevToken = token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.SEMICOLON);
            case '=':
                this.advance();
                return this.prevToken = token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.ASSIGNMENT);
            case ')':
                this.advance();
                this.insideForHeader = false;
                return this.prevToken = token_1.TokenFactory.createFromType(token_1.TOKEN_TYPE.PARENTHESIS_CLOSE);
            default:
                if ([token_1.TOKEN_TYPE.COLON, token_1.TOKEN_TYPE.ASSIGNMENT].includes(this.prevToken.tokenType)) {
                    return this.prevToken = token_1.TokenFactory.createFromTypeAndValue(token_1.TOKEN_TYPE.INTERPOLATION, this.readJSXInterpolationUntil(new Set([';', ')'])), true);
                }
                if ((0, util_1.isText)(this.currentChar)) {
                    return this.prevToken = token_1.TokenFactory.createFromTypeAndValue(token_1.TOKEN_TYPE.IDENTIFIER, this.readIdentifierName());
                }
                throw new Error(`unidentified token "${this.currentChar}" inside @for(...)`);
        }
    }
    readIdentifierName() {
        if (!(/^[a-zA-Z_]$/.test(this.currentChar)))
            throw new Error(`identifier should start from a letter or underscore`);
        let str = this.currentChar;
        this.advance();
        while (this.currentPosition < this.source.length && (/^[a-zA-Z0-9_]$/.test(this.currentChar))) {
            str += this.currentChar;
            this.advance();
        }
        return str;
    }
    readJSXInterpolationUntil(delimeters) {
        let res = '';
        while (this.currentPosition < this.source.length && !delimeters.has(this.currentChar)) {
            if (this.currentChar === '`') {
                res += this.readStringInterpolation();
            }
            else {
                res += this.source[this.currentPosition++];
            }
        }
        if (this.currentPosition >= this.source.length) {
            throw new Error(`unterminated @for(...) expression`);
        }
        return res;
    }
    readString() {
        // only use when you know it's pure string
        // like attribute value
        this.advance();
        let res = '';
        while (!['"', "'"].includes(this.currentChar)) {
            res += this.currentChar;
            this.advance();
        }
        this.advance();
        return res;
    }
    readStructuralDirectiveIdentifire() {
        const delimeters = new Set(['{', '(']);
        let res = '';
        while (this.currentPosition < this.source.length && !delimeters.has(this.currentChar)) {
            res += this.source[this.currentPosition++];
        }
        return res;
    }
    readText() {
        // reads innertexts mostly and similar string which is written with other tokens
        // interpolation, tags, structural directives etc
        const delimeters = new Set(['{', "<", "@"]);
        let res = '';
        while (this.currentPosition < this.source.length && !delimeters.has(this.currentChar)) {
            res += this.source[this.currentPosition++];
        }
        return res;
    }
    readJSXInterpolation(enclosedIn = '{') {
        // parse context within {}
        let delimeter = enclosedIn === '{' ? '}' : ')';
        if (enclosedIn === '{') {
            if (this.currentChar !== '{') {
                throw new Error(`expected '{' got '${this.currentChar}'`);
            }
            this.currentPosition++;
        }
        let res = '';
        while (this.currentPosition < this.source.length && this.currentChar !== delimeter) {
            if (this.currentChar === '`') {
                res += this.readStringInterpolation();
            }
            else {
                res += this.source[this.currentPosition++];
            }
        }
        if (enclosedIn === '{') {
            if (this.currentChar !== '}') {
                throw new Error(`expected '}' got '${token_1.TOKEN_VALUE[token_1.TOKEN_TYPE.END_OF_FILE]}'`);
            }
            this.advance(); // skipping closing '}'
        }
        else {
            if (this.currentChar !== ')') {
                throw new Error(`expected ')' got '${token_1.TOKEN_VALUE[token_1.TOKEN_TYPE.END_OF_FILE]}'`);
            }
            // no need to skip )
        }
        return res;
    }
    readStringInterpolation() {
        //parse content withing ``
        if (this.currentChar !== '`') {
            throw new Error(`expected '\`' got '${this.currentChar}'`);
        }
        let res = '`';
        this.currentPosition++;
        while (this.currentPosition < this.source.length && this.currentChar !== '`') {
            if (this.currentChar === '$' && this.source[this.currentPosition + 1] === '{') {
                this.currentPosition++;
                res += `\${${this.readJSXInterpolation()}}`;
            }
            else {
                res += this.source[this.currentPosition++];
            }
        }
        if (this.currentChar !== '`') {
            throw new Error(`expected '\`' got '${token_1.TOKEN_VALUE[token_1.TOKEN_TYPE.END_OF_FILE]}'`);
        }
        res += this.currentChar; // include closing `
        this.currentPosition++; // skipping past closing `
        return res;
    }
    returnToken(token, advance = 1) {
        advance && this.advance(advance);
        this.prevToken = token;
        return token;
    }
}
exports.Lexer = Lexer;

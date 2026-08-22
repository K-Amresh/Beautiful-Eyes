"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenFactory = void 0;
const token_class_1 = require("./token.class");
const token_enum_1 = require("./token.enum");
class TokenFactory {
    static createFromType(token) {
        return new token_class_1.Token(token, token_enum_1.TOKEN_VALUE[token]);
    }
    static createFromTypeAndValue(token, value, isInterpolation) {
        return new token_class_1.Token(token, value, isInterpolation);
    }
}
exports.TokenFactory = TokenFactory;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
class Token {
    constructor(tokenType, value, isInterpolation) {
        this.tokenType = tokenType;
        this.value = value;
        this.isInterpolation = isInterpolation;
    }
}
exports.Token = Token;

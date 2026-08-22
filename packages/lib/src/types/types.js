"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Types = void 0;
class Types {
    static stringConv(obj) {
        return Object.prototype.toString.call(obj);
    }
    static isNumber(obj) {
        return typeof obj === 'number';
    }
    static isString(obj) {
        return typeof obj === 'string';
    }
    static isObject(obj) {
        return Types.stringConv(obj) === '[object Object]';
    }
    static isArray(obj) {
        return Types.stringConv(obj) === '[object Array]';
    }
    static isMap(obj) {
        return Types.stringConv(obj) === '[object Map]';
    }
    static isSet(obj) {
        return Types.stringConv(obj) === '[object Set]';
    }
    static isDate(obj) {
        return Types.stringConv(obj) === '[object Date]';
    }
    static isHtmlTag(tagName) {
        return /^[a-z]$/.test(tagName[0]);
    }
    static isComponent(tagName) {
        return /^[A-Z]$/.test(tagName[0]);
    }
    static isStructuralDirective() {
    }
}
exports.Types = Types;
;

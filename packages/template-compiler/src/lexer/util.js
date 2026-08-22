"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidAttributeName = isValidAttributeName;
exports.isValidTagName = isValidTagName;
exports.isText = isText;
exports.isNum = isNum;
exports.isTextOrNum = isTextOrNum;
exports.isTextOrNumOrInterpolation = isTextOrNumOrInterpolation;
exports.getDelimeterForAttributes = getDelimeterForAttributes;
function isValidAttributeName(text) {
    return (/^($|#|@)?[a-zA-Z]{1}[a-zA-Z0-9_-]*/).test(text);
}
function isValidTagName(text) {
    return (/^[a-zA-Z][a-zA-Z0-9_]*$/).test(text);
}
function isText(text) {
    return (/[a-zA-Z]/).test(text);
}
function isNum(text) {
    return (/[0-9]/).test(text);
}
function isTextOrNum(text) {
    return isText(text) || isNum(text);
}
function isTextOrNumOrInterpolation(text) {
    return isTextOrNum(text) || (/[{]/).test(text);
}
function getDelimeterForAttributes(text) {
    switch (text) {
        case '"':
        case "'":
        case "`": return text;
        case '{': return '}';
        default: return '<'; // for plain simple text , either closing or opening tag wil be the delimeter
    }
}

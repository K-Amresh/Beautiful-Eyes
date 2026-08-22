"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassFromPrototypeChain = getClassFromPrototypeChain;
function getClassFromPrototypeChain(obj, parentClass) {
    if (!parentClass.constructor) {
        throw new Error("parentClass should be a class");
    }
    if (!obj.__proto__.constructor) {
        throw new Error("obj should be an instance of a class");
    }
    if (!(obj instanceof parentClass)) {
        throw new Error("obj should be inherited from parentClass");
    }
    let proto = obj;
    while (proto && proto instanceof parentClass) {
        proto = proto.__proto__;
    }
    return proto;
}

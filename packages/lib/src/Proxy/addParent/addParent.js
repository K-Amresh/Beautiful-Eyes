"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addParent = addParent;
const proxyObjectKeys_1 = require("../proxyObjectKeys/proxyObjectKeys");
function addParent(obj, parent = null) {
    Object.defineProperty(obj, proxyObjectKeys_1.PROXY_OBJECT_KEYS.parent, {
        value: parent,
        writable: true,
        enumerable: false,
        configurable: false
    });
}

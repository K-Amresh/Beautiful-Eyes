"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPath = addPath;
const proxyObjectKeys_1 = require("../proxyObjectKeys/proxyObjectKeys");
function addPath(obj, path) {
    Object.defineProperty(obj, proxyObjectKeys_1.PROXY_OBJECT_KEYS.path, {
        value: path,
        enumerable: false,
        writable: true,
        configurable: false
    });
}

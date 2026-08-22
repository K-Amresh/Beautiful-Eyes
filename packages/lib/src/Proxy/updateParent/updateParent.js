"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateParent = updateParent;
const proxyObjectKeys_1 = require("../proxyObjectKeys/proxyObjectKeys");
function updateParent(obj, parent) {
    obj[proxyObjectKeys_1.PROXY_OBJECT_KEYS.parent] = parent;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bootstrap;
function bootstrap(el, rootNode) {
    if (!el)
        el = document.body;
    //rootNode.serParent(el);
    const roots = rootNode.view.root;
    const frag = document.createDocumentFragment();
    roots.forEach((el) => frag.appendChild(el));
    el.appendChild(frag);
}

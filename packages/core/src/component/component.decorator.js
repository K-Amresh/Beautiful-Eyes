"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Component;
const view_class_1 = require("../View/view.class");
const componentRegistry_1 = require("./componentRegistry");
function Component(options) {
    return function (target, context) {
        class Component extends target {
            constructor(...props) {
                super(...props);
                this.reactiveElements = new Map();
                this._HtmlParent = document.body;
                this.view = new view_class_1.View(this, this._HtmlParent);
                this.init();
            }
            init() {
                var _a, _b;
                if (!this.template)
                    throw new Error("template is required for " + context.name);
                (_b = (_a = this).addOtherSubscription) === null || _b === void 0 ? void 0 : _b.call(_a, () => {
                    this.reactiveElements.forEach((fn, element) => {
                        fn.call(this);
                    });
                });
            }
            destroyed() {
            }
            get template() {
                return Component._template;
            }
            setHtmlParent(el) {
                this._HtmlParent = el;
            }
        }
        Component._template = options.useTemplate;
        if (componentRegistry_1.ComponentRegistry.has(options.selector)) {
            throw new Error(`a component with selector "${options.selector}" is already registered`);
        }
        componentRegistry_1.ComponentRegistry.set(options.selector, Component);
        return Component;
    };
}

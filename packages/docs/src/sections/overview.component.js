"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overview = void 0;
const core_1 = require("@beautiful-eyes/core");
const overview_template_be_1 = __importDefault(require("./overview.template.be"));
let Overview = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'Overview',
            useTemplate: overview_template_be_1.default,
            useStyleSheets: []
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = core_1.ReactiveClass;
    var Overview = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.features = [
                {
                    title: 'Proxy-based state',
                    body: '@State wraps arrays, objects, Maps and Sets in a Proxy. Mutate in place -- push an item, flip a boolean two levels deep -- and the affected bindings still update, no immutable-update boilerplate.',
                },
                {
                    title: 'Subscription-based updates',
                    body: 'Every component instance keeps its own list of subscribers. A state change notifies exactly that instance\'s bindings -- not a global re-render, not the whole app.',
                },
                {
                    title: 'Fine-grained DOM updates',
                    body: 'There is no virtual DOM and no diffing pass. Each binding -- a text node, an attribute, an @if branch, a @for entry -- updates itself directly when it is notified.',
                },
                {
                    title: 'Code style inspired by Angular',
                    body: 'Decorators on plain TypeScript classes -- @Component, @State, @Effect, @Input -- instead of JSX or templates-as-functions. A component is a class with a separate template file.',
                },
                {
                    title: 'Change detection inspired by Vue',
                    body: 'Reactivity comes from Proxy interception on state you already read and write naturally, rather than compiler-injected signals (Svelte) or explicit signal primitives (Solid).',
                },
            ];
            this.npmPackages = [
                { name: '@beautiful-eyes/core', href: 'https://www.npmjs.com/package/@beautiful-eyes/core', body: 'Runtime -- @Component, View, bootstrap, and the reactive decorators.' },
                { name: '@beautiful-eyes/reactiveclass', href: 'https://www.npmjs.com/package/@beautiful-eyes/reactiveclass', body: 'ReactiveClass, @State, @Effect, @Input.' },
                { name: '@beautiful-eyes/template-compiler', href: 'https://www.npmjs.com/package/@beautiful-eyes/template-compiler', body: 'Webpack loader for .template.be files.' },
                { name: '@beautiful-eyes/lib', href: 'https://www.npmjs.com/package/@beautiful-eyes/lib', body: 'Proxify, shared types, helpers.' },
                { name: '@beautiful-eyes/dynamic-import', href: 'https://www.npmjs.com/package/@beautiful-eyes/dynamic-import', body: 'TypeScript transformer for template and stylesheet imports.' },
                { name: '@beautiful-eyes/create', href: 'https://www.npmjs.com/package/@beautiful-eyes/create', body: 'npx scaffolder -- webpack, TypeScript, and a first counter.' },
            ];
        }
    };
    __setFunctionName(_classThis, "Overview");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Overview = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Overview = _classThis;
})();
exports.Overview = Overview;

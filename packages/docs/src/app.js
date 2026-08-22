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
const core_1 = require("@beautiful-eyes/core");
const app_template_be_1 = __importDefault(require("./app.template.be"));
require("./app.styles.scss");
require("./sections/overview.component");
require("./sections/get-started.component");
require("./sections/reactive-class.component");
require("./sections/components.component");
require("./sections/templates.component");
require("./sections/examples.component");
require("./sections/playground.component");
require("./sections/contributing.component");
require("./sections/sponsor.component");
let DocsApp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'DocsApp',
            useTemplate: app_template_be_1.default,
            useStyleSheets: []
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = core_1.ReactiveClass;
    let _activeTab_decorators;
    let _activeTab_initializers = [];
    let _activeTab_extraInitializers = [];
    let _menuOpen_decorators;
    let _menuOpen_initializers = [];
    let _menuOpen_extraInitializers = [];
    var DocsApp = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.activeTab = __runInitializers(this, _activeTab_initializers, 'overview');
            this.menuOpen = (__runInitializers(this, _activeTab_extraInitializers), __runInitializers(this, _menuOpen_initializers, false));
            this.tabs = (__runInitializers(this, _menuOpen_extraInitializers), [
                { key: 'overview', label: 'Overview' },
                { key: 'get-started', label: 'Get Started' },
                { key: 'reactive-class', label: 'Reactive Class' },
                { key: 'components', label: 'Components' },
                { key: 'templates', label: 'Templates' },
                { key: 'examples', label: 'Examples' },
                { key: 'playground', label: 'Playground' },
                { key: 'contributing', label: 'Contributing' },
                { key: 'sponsor', label: 'Sponsor' },
            ]);
        }
        setTab(key) {
            this.activeTab = key;
            this.menuOpen = false;
        }
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
        }
    };
    __setFunctionName(_classThis, "DocsApp");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _activeTab_decorators = [(0, core_1.State)()];
        _menuOpen_decorators = [(0, core_1.State)()];
        __esDecorate(null, null, _activeTab_decorators, { kind: "field", name: "activeTab", static: false, private: false, access: { has: obj => "activeTab" in obj, get: obj => obj.activeTab, set: (obj, value) => { obj.activeTab = value; } }, metadata: _metadata }, _activeTab_initializers, _activeTab_extraInitializers);
        __esDecorate(null, null, _menuOpen_decorators, { kind: "field", name: "menuOpen", static: false, private: false, access: { has: obj => "menuOpen" in obj, get: obj => obj.menuOpen, set: (obj, value) => { obj.menuOpen = value; } }, metadata: _metadata }, _menuOpen_initializers, _menuOpen_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DocsApp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DocsApp = _classThis;
})();
const root = document.getElementById('root');
(0, core_1.bootstrap)(root, new DocsApp());

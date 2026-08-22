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
exports.CodeViewer = void 0;
const core_1 = require("@beautiful-eyes/core");
const code_viewer_template_be_1 = __importDefault(require("./code-viewer.template.be"));
// generic, reusable "tabbed code" panel -- pass any number of {key,label,code}
// tabs via $tabs. Used by the Examples page so adding a new tab (or a whole
// new example) never needs new tab-switching UI, only more data.
let CodeViewer = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'CodeViewer',
            useTemplate: code_viewer_template_be_1.default,
            useStyleSheets: []
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = core_1.ReactiveClass;
    let _tabs_decorators;
    let _tabs_initializers = [];
    let _tabs_extraInitializers = [];
    let _selectedKey_decorators;
    let _selectedKey_initializers = [];
    let _selectedKey_extraInitializers = [];
    var CodeViewer = _classThis = class extends _classSuper {
        get activeKey() {
            var _a, _b, _c;
            return (_c = (_a = this.selectedKey) !== null && _a !== void 0 ? _a : (_b = this.tabs[0]) === null || _b === void 0 ? void 0 : _b.key) !== null && _c !== void 0 ? _c : '';
        }
        get activeCode() {
            const found = this.tabs.find(t => t.key === this.activeKey);
            return found ? found.code : '';
        }
        selectTab(key) {
            this.selectedKey = key;
        }
        constructor() {
            super(...arguments);
            this.tabs = __runInitializers(this, _tabs_initializers, []);
            this.selectedKey = (__runInitializers(this, _tabs_extraInitializers), __runInitializers(this, _selectedKey_initializers, null));
            __runInitializers(this, _selectedKey_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "CodeViewer");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _tabs_decorators = [(0, core_1.Input)()];
        _selectedKey_decorators = [(0, core_1.State)()];
        __esDecorate(null, null, _tabs_decorators, { kind: "field", name: "tabs", static: false, private: false, access: { has: obj => "tabs" in obj, get: obj => obj.tabs, set: (obj, value) => { obj.tabs = value; } }, metadata: _metadata }, _tabs_initializers, _tabs_extraInitializers);
        __esDecorate(null, null, _selectedKey_decorators, { kind: "field", name: "selectedKey", static: false, private: false, access: { has: obj => "selectedKey" in obj, get: obj => obj.selectedKey, set: (obj, value) => { obj.selectedKey = value; } }, metadata: _metadata }, _selectedKey_initializers, _selectedKey_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CodeViewer = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CodeViewer = _classThis;
})();
exports.CodeViewer = CodeViewer;

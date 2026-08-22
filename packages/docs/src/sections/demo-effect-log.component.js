"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoEffectLog = void 0;
const core_1 = require("@beautiful-eyes/core");
const demo_effect_log_template_be_1 = __importDefault(require("./demo-effect-log.template.be"));
let DemoEffectLog = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'DemoEffectLog',
            useTemplate: demo_effect_log_template_be_1.default,
            useStyleSheets: []
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = core_1.ReactiveClass;
    let _instanceExtraInitializers = [];
    let _count_decorators;
    let _count_initializers = [];
    let _count_extraInitializers = [];
    let _onCountChange_decorators;
    var DemoEffectLog = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.count = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _count_initializers, 0));
            // plain field, not @State: this effect runs inside a reactive pass
            // that will already refresh every binding afterward, so a plain
            // mutation here is picked up for free -- making `log` @State too
            // would just trigger a second, redundant pass
            this.log = (__runInitializers(this, _count_extraInitializers), []);
        }
        onCountChange(previous) {
            const message = previous === undefined
                ? `initial count is ${this.count}`
                : `count changed from ${previous} to ${this.count}`;
            this.log = [message, ...this.log].slice(0, 4);
        }
        increment() {
            this.count++;
        }
    };
    __setFunctionName(_classThis, "DemoEffectLog");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _count_decorators = [(0, core_1.State)()];
        _onCountChange_decorators = [(0, core_1.Effect)((ctx) => [ctx.count])];
        __esDecorate(_classThis, null, _onCountChange_decorators, { kind: "method", name: "onCountChange", static: false, private: false, access: { has: obj => "onCountChange" in obj, get: obj => obj.onCountChange }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _count_decorators, { kind: "field", name: "count", static: false, private: false, access: { has: obj => "count" in obj, get: obj => obj.count, set: (obj, value) => { obj.count = value; } }, metadata: _metadata }, _count_initializers, _count_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DemoEffectLog = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DemoEffectLog = _classThis;
})();
exports.DemoEffectLog = DemoEffectLog;

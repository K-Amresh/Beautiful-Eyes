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
exports.CopyCommand = void 0;
const core_1 = require("@beautiful-eyes/core");
const copy_command_template_be_1 = __importDefault(require("./copy-command.template.be"));
let CopyCommand = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'CopyCommand',
            useTemplate: copy_command_template_be_1.default,
            useStyleSheets: []
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = core_1.ReactiveClass;
    let _command_decorators;
    let _command_initializers = [];
    let _command_extraInitializers = [];
    let _copied_decorators;
    let _copied_initializers = [];
    let _copied_extraInitializers = [];
    var CopyCommand = _classThis = class extends _classSuper {
        copy() {
            const text = this.command;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => this.markCopied());
                return;
            }
            this.fallbackCopy(text);
            this.markCopied();
        }
        markCopied() {
            this.copied = true;
            setTimeout(() => { this.copied = false; }, 1600);
        }
        fallbackCopy(text) {
            const el = document.createElement('textarea');
            el.value = text;
            el.setAttribute('readonly', '');
            el.style.position = 'fixed';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
        constructor() {
            super(...arguments);
            this.command = __runInitializers(this, _command_initializers, '');
            this.copied = (__runInitializers(this, _command_extraInitializers), __runInitializers(this, _copied_initializers, false));
            __runInitializers(this, _copied_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "CopyCommand");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _command_decorators = [(0, core_1.Input)()];
        _copied_decorators = [(0, core_1.State)()];
        __esDecorate(null, null, _command_decorators, { kind: "field", name: "command", static: false, private: false, access: { has: obj => "command" in obj, get: obj => obj.command, set: (obj, value) => { obj.command = value; } }, metadata: _metadata }, _command_initializers, _command_extraInitializers);
        __esDecorate(null, null, _copied_decorators, { kind: "field", name: "copied", static: false, private: false, access: { has: obj => "copied" in obj, get: obj => obj.copied, set: (obj, value) => { obj.copied = value; } }, metadata: _metadata }, _copied_initializers, _copied_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CopyCommand = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CopyCommand = _classThis;
})();
exports.CopyCommand = CopyCommand;

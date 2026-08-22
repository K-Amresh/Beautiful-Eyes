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
exports.ComponentsDocs = void 0;
const core_1 = require("@beautiful-eyes/core");
const components_template_be_1 = __importDefault(require("./components.template.be"));
require("./demo-chip.component");
let ComponentsDocs = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ComponentsDocs',
            useTemplate: components_template_be_1.default,
            useStyleSheets: []
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = core_1.ReactiveClass;
    let _chips_decorators;
    let _chips_initializers = [];
    let _chips_extraInitializers = [];
    var ComponentsDocs = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.chips = __runInitializers(this, _chips_initializers, [
                { id: 1, label: 'Coffee', count: 0 },
                { id: 2, label: 'Tea', count: 0 },
                { id: 3, label: 'Code', count: 0 },
            ]);
            this.todoItemSample = (__runInitializers(this, _chips_extraInitializers), `import { Component, ReactiveClass, Input } from '@beautiful-eyes/core';
import template from './todo-item.template.be';

@Component({
    selector: 'TodoItem',
    useTemplate: template,
    useStyleSheets: []
})
export class TodoItem extends ReactiveClass {
    @Input() label = '';
    @Input() done = false;
    onToggle?: () => void;

    toggle(){
        this.onToggle?.();
    }
}`);
            this.registrationSample = `import './todo-item.component'; // registers 'TodoItem', even though nothing here uses the export`;
            this.usageSample = `<TodoItem $label={item.label} $done={item.done} @onToggle={() => toggleItem(item.id)}></TodoItem>

<!-- or self-closing -->
<TodoItem $label={item.label} $done={item.done} />`;
            this.nestingSample = `@for(item : items; key = trackById){
  <TodoItem $label={item.label} $done={item.done} @onToggle={() => toggleItem(item.id)} />
}`;
        }
        trackChipById(chip) {
            return chip.id;
        }
        bumpChip(id) {
            const chip = this.chips.find(c => c.id === id);
            if (chip)
                chip.count++;
        }
    };
    __setFunctionName(_classThis, "ComponentsDocs");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _chips_decorators = [(0, core_1.State)()];
        __esDecorate(null, null, _chips_decorators, { kind: "field", name: "chips", static: false, private: false, access: { has: obj => "chips" in obj, get: obj => obj.chips, set: (obj, value) => { obj.chips = value; } }, metadata: _metadata }, _chips_initializers, _chips_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComponentsDocs = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComponentsDocs = _classThis;
})();
exports.ComponentsDocs = ComponentsDocs;

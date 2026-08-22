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
exports.DemoTodoList = void 0;
const core_1 = require("@beautiful-eyes/core");
const demo_todo_list_template_be_1 = __importDefault(require("./demo-todo-list.template.be"));
let DemoTodoList = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'DemoTodoList',
            useTemplate: demo_todo_list_template_be_1.default,
            useStyleSheets: []
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = core_1.ReactiveClass;
    let _items_decorators;
    let _items_initializers = [];
    let _items_extraInitializers = [];
    let _filter_decorators;
    let _filter_initializers = [];
    let _filter_extraInitializers = [];
    var DemoTodoList = _classThis = class extends _classSuper {
        get filteredItems() {
            if (this.filter === 'active')
                return this.items.filter(i => !i.done);
            if (this.filter === 'done')
                return this.items.filter(i => i.done);
            return this.items;
        }
        trackById(item) {
            return item.id;
        }
        setFilter(filter) {
            this.filter = filter;
        }
        toggle(id) {
            const item = this.items.find(i => i.id === id);
            if (item)
                item.done = !item.done;
        }
        remove(id) {
            this.items = this.items.filter(i => i.id !== id);
        }
        add() {
            const id = this.items.length ? Math.max(...this.items.map(i => i.id)) + 1 : 1;
            this.items = [...this.items, { id, label: 'New task ' + id, done: false }];
        }
        constructor() {
            super(...arguments);
            this.items = __runInitializers(this, _items_initializers, [
                { id: 1, label: 'Write docs', done: true },
                { id: 2, label: 'Fix reactivity bug', done: true },
                { id: 3, label: 'Ship the playground', done: false },
            ]);
            this.filter = (__runInitializers(this, _items_extraInitializers), __runInitializers(this, _filter_initializers, 'all'));
            __runInitializers(this, _filter_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "DemoTodoList");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _items_decorators = [(0, core_1.State)()];
        _filter_decorators = [(0, core_1.State)()];
        __esDecorate(null, null, _items_decorators, { kind: "field", name: "items", static: false, private: false, access: { has: obj => "items" in obj, get: obj => obj.items, set: (obj, value) => { obj.items = value; } }, metadata: _metadata }, _items_initializers, _items_extraInitializers);
        __esDecorate(null, null, _filter_decorators, { kind: "field", name: "filter", static: false, private: false, access: { has: obj => "filter" in obj, get: obj => obj.filter, set: (obj, value) => { obj.filter = value; } }, metadata: _metadata }, _filter_initializers, _filter_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DemoTodoList = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DemoTodoList = _classThis;
})();
exports.DemoTodoList = DemoTodoList;

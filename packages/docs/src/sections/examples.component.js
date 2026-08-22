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
exports.Examples = void 0;
const core_1 = require("@beautiful-eyes/core");
const examples_template_be_1 = __importDefault(require("./examples.template.be"));
require("./code-viewer.component");
require("./demo-todo-list.component");
require("./demo-search.component");
require("./demo-accordion.component");
// Adding a new example: append one entry here (id/title/description/tabs),
// then add one matching branch to the @if/@else-if chain in
// examples.template.be that renders <id>'s live demo tag. Everything else
// (layout, the tabbed code viewer) is shared and needs no changes.
let Examples = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'Examples',
            useTemplate: examples_template_be_1.default,
            useStyleSheets: []
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = core_1.ReactiveClass;
    var Examples = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.todoComponentSample = `type Filter = 'all' | 'active' | 'done';

@Component({
    selector: 'TodoList',
    useTemplate: template,
    useStyleSheets: [style]
})
class TodoList extends ReactiveClass {
    @State() items = [
        { id: 1, label: 'Write docs', done: true },
        { id: 2, label: 'Fix reactivity bug', done: true },
        { id: 3, label: 'Ship the playground', done: false },
    ];
    @State() filter: Filter = 'all';

    // a getter, not a method call -- @for(item : filteredItems())
    // would fail to parse (see Contributing -> gotchas)
    get filteredItems(){
        if (this.filter === 'active') return this.items.filter(i => !i.done);
        if (this.filter === 'done') return this.items.filter(i => i.done);
        return this.items;
    }

    trackById(item: { id: number }){ return item.id; }
    setFilter(filter: Filter){ this.filter = filter; }

    toggle(id: number){
        const item = this.items.find(i => i.id === id);
        if (item) item.done = !item.done;
    }

    remove(id: number){
        this.items = this.items.filter(i => i.id !== id);
    }
}`;
            this.todoStyleSample = `.demo-todo-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.demo-todo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 8px 10px;
}

.demo-todo.done span {
    text-decoration: line-through;
    color: var(--text-dim);
}`;
            this.todoTemplateSample = `<div class="buttons">
  <button @click={() => setFilter('all')}>all</button>
  <button @click={() => setFilter('active')}>active</button>
  <button @click={() => setFilter('done')}>done</button>
</div>
<ul>
@for(item : filteredItems; key = trackById){
  <li class={item.done ? 'done' : ''}>
    <span @click={() => toggle(item.id)}>{item.label}</span>
    <button @click={() => remove(item.id)}>x</button>
  </li>
}
</ul>`;
            this.searchComponentSample = `@Component({
    selector: 'Search',
    useTemplate: template,
    useStyleSheets: [style]
})
class Search extends ReactiveClass {
    @State() query = '';
    items = ['Proxy', 'Subscription', 'Fine-grained updates', 'Decorators'];

    get filtered(){
        const q = this.query.trim().toLowerCase();
        if (!q) return this.items;
        return this.items.filter(i => i.toLowerCase().includes(q));
    }

    // @name={expr} on a plain element works for any native DOM event,
    // not just click -- here it is the input event
    onInput(e: Event){
        this.query = (e.target as HTMLInputElement).value;
    }
}`;
            this.searchStyleSample = `.demo-input {
    width: 100%;
    border: 1px solid var(--border);
    background: var(--bg);
    color: var(--text);
    padding: 8px 12px;
    border-radius: 6px;
}

.demo-empty {
    font-size: 13px;
    color: var(--text-dim);
    font-style: italic;
}`;
            this.searchTemplateSample = `<input type="text" @input={onInput} />
<ul>
@for(item : filtered){
  <li>{item}</li>
}
</ul>
@if(filtered.length === 0){
  <p>no matches</p>
}`;
            this.accordionComponentSample = `@Component({
    selector: 'Accordion',
    useTemplate: template,
    useStyleSheets: [style]
})
class Accordion extends ReactiveClass {
    @State() faqs = [
        { id: 1, q: 'Is there a virtual DOM?', a: '...', open: true },
        { id: 2, q: 'How does @State track mutations?', a: '...', open: false },
    ];

    trackById(faq: { id: number }){ return faq.id; }

    toggle(id: number){
        const faq = this.faqs.find(f => f.id === id);
        if (faq) faq.open = !faq.open;
    }
}`;
            this.accordionStyleSample = `.demo-faq {
    border: 1px solid var(--border);
    border-radius: 6px;
    overflow: hidden;
}

.demo-faq-question {
    width: 100%;
    text-align: left;
    background: var(--bg);
    border: none;
    padding: 10px 14px;
    cursor: pointer;
}

.demo-faq-answer {
    margin: 0;
    padding: 0 14px 12px;
}`;
            this.accordionTemplateSample = `@for(faq : faqs; key = trackById){
  <div class="faq">
    <button @click={() => toggle(faq.id)}>{faq.q}</button>
    @if(faq.open){
      <p>{faq.a}</p>
    }
  </div>
}`;
            this.examples = [
                {
                    id: 'todo',
                    title: 'Todo list -- @State, keyed @for, a derived getter',
                    description: 'Filtering by all / active / done reads from a getter, not a plain field -- it recomputes on every access, and since it is accessed as a bare property (filteredItems, no parens) it is safe to reference directly inside @for.',
                    tabs: [
                        { key: 'component', label: 'component.ts', code: this.todoComponentSample },
                        { key: 'style', label: 'style.css', code: this.todoStyleSample },
                        { key: 'template', label: 'template.be', code: this.todoTemplateSample },
                    ],
                },
                {
                    id: 'search',
                    title: 'Live search -- native DOM events, @if',
                    description: '@name={expr} works for any native DOM event name, not just click -- here it listens for input to filter a list as you type.',
                    tabs: [
                        { key: 'component', label: 'component.ts', code: this.searchComponentSample },
                        { key: 'style', label: 'style.css', code: this.searchStyleSample },
                        { key: 'template', label: 'template.be', code: this.searchTemplateSample },
                    ],
                },
                {
                    id: 'accordion',
                    title: 'Accordion -- nested @if inside @for',
                    description: 'Each item in the list carries its own open flag, and its own @if branch -- toggling one entry does not affect the others.',
                    tabs: [
                        { key: 'component', label: 'component.ts', code: this.accordionComponentSample },
                        { key: 'style', label: 'style.css', code: this.accordionStyleSample },
                        { key: 'template', label: 'template.be', code: this.accordionTemplateSample },
                    ],
                },
            ];
        }
    };
    __setFunctionName(_classThis, "Examples");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Examples = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Examples = _classThis;
})();
exports.Examples = Examples;

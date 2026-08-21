import { Component, ReactiveClass } from '@beautiful-eyes/core';
import template from './contributing.template.be';
import './code-viewer.component';

@Component({
    selector: 'Contributing',
    useTemplate: template,
    useStyleSheets: []
})
export class Contributing extends ReactiveClass {
    toc = [
        { href: '#how-to-read', label: 'How to read this page' },
        { href: '#structure', label: 'Project structure' },
        { href: '#state', label: 'ReactiveClass, @State, Proxy, subscribers' },
        { href: '#compiler', label: 'Template compiler' },
        { href: '#interpolation', label: 'Interpolations, reactiveElements, otherSubscriptions' },
        { href: '#component', label: '@Component, template, bootstrap' },
        { href: '#children', label: 'How changes reach children' },
        { href: '#ifelse', label: '@if / @else-if / @else' },
        { href: '#for', label: '@for' },
        { href: '#lookup', label: 'Where to look' },
    ];

    packages = [
        { name: 'template-compiler', body: 'Webpack loader that compiles .template.be files (lexer -> parser -> AST -> visitor) into a plain JS module.' },
        { name: 'reactiveClass', body: 'The reactivity primitives -- ReactiveClass, @State, @Effect, @Computed, @Input.' },
        { name: 'core', body: 'Turns a compiled template into real DOM, wires up reactivity, implements the component system.' },
        { name: 'lib', body: 'Shared utilities -- the Proxy machinery, shared types, a task queue.' },
        { name: 'dynamic-import', body: 'A TypeScript transformer: rewrites static imports into dynamic ones.' },
        { name: 'qa', body: 'A small example app used to exercise the framework end-to-end.' },
        { name: 'docs', body: 'This site -- itself a Beautiful Eyes app.' },
    ];

    pendingItems = [
        { name: '@Computed()', body: 'Passthrough getter -- no caching, no dependency tracking. computedSubscribers and addComputedSubscribers exist but are unused. Implementation pending.' },
        { name: '@switch / @case', body: 'Tokens and parseSwitch() exist; the parser body is empty. Use an @if / @else-if chain.' },
        { name: '#ref', body: 'Parsed as reserved syntax, not wired to a live element reference.' },
        { name: 'TaskQueue / comitBatchedItems', body: 'Imported and stubbed; @State notifies runSubscribers synchronously today.' },
        { name: 'destroyed()', body: 'Empty method on the component subclass; nothing in View calls it on unmount.' },
    ];

    subscriberRows = [
        { name: 'effectSubscribers', type: 'Map<DependencyFn, EffectFnName>', who: '@Effect via addEffectSubscribers', role: 'depFn -> effect method name. runSubscribers diffs depFn(this) against effectDepFnPreviousValue and calls the method for each changed index.' },
        { name: 'effectDepFnPreviousValue', type: 'Map<DependencyFn, any>', who: 'runSubscribers', role: 'Last depFn result, so the next pass can compare by index. First run has no previous value, so the effect is called once per slot with undefined.' },
        { name: 'computedSubscribers', type: 'Map<string, Set<string>>', who: 'addComputedSubscribers -- implementation pending', role: 'Reserved for @Computed memoization. @Computed() is a passthrough getter today, so this map stays empty. Wiring it up is open work.' },
        { name: 'otherSubscriptions', type: 'Function[]', who: '@Component init via addOtherSubscription', role: 'Generic callbacks run after effects. The component pushes one function that walks reactiveElements.' },
    ];

    compileSteps = [
        { title: '.template.be source', body: 'Raw text: tags, {interpolations}, @if / @for, and $prop / @event / #ref attributes.' },
        { title: 'Lexer (lexer.ts)', body: 'Turns raw text into a token stream: TAG_OPEN, ATTRIBUTE_NAME, INTERPOLATION, IF, FOR, CURLEY_BRACKET_OPEN, and so on. Context-sensitive: what a character means depends on the previous token.' },
        { title: 'Parser (parser.ts)', body: 'Consumes the token stream, builds an AST: HtmlElement, Interpolation, StringNode, IfElse, For, HtmlAttribute, Ref.' },
        { title: 'Stringify visitor (visitors/stringify)', body: 'Walks the AST, emits a plain JS module -- an array of HtmlObj / DirectiveObj object literals and inline functions. NODE_OBJ_TYPE.HTML_ELEMENT is 0, DIRECTIVE is 1.' },
        { title: 'webpack', body: 'Treats that emitted JS as the loader\'s output. Importing a .template.be file gets you this compiled module as its default export, stored on the component as static _template.' },
    ];

    bindingKinds = [
        { title: 'Text interpolation', body: 'Text node in reactiveElements. Updater sets textContent = interpolation.call(component).' },
        { title: 'Dynamic attribute', body: 'Element in reactiveElements. Updater re-applies every function-valued attribute.' },
        { title: '@if / @else', body: 'Comment in reactiveElements. Re-checks conditions; remounts the body if the winning index changed.' },
        { title: '@for', body: 'Comment in reactiveElements. Rebuilds or reuses rows by key, then repositions.' },
        { title: 'Component props', body: 'Comment in reactiveElements. Re-applies $props onto the child instance @Input fields.' },
        { title: 'Event listener', body: 'Not in reactiveElements. addEventListener once at mount; the handler is not re-bound on notify.' },
    ];

    quickReference = [
        { task: 'Add a new attribute prefix (like $ or @)', files: 'lexer.ts (readAttributeName), parser.ts (parseAttribute)' },
        { task: 'Add a new structural directive', files: 'token.enum.ts, lexer.ts, parser.ts, a new AST node, Visitor + both visitors, view.class.ts' },
        { task: 'Change how @State reactivity works', files: 'reactiveClass.ts, state.decorator.ts, lib/src/Proxy/proxify' },
        { task: 'Change how components mount or receive props', files: 'view.class.ts (buildComponent), component.decorator.ts, componentRegistry.ts' },
        { task: 'Change how interpolations bind', files: 'interpolationTranspiler.ts, stringify.ts visitInterpolation, view.class.ts buildInterpolationNode' },
        { task: 'Change how parent props reach a child', files: 'view.class.ts (buildComponent, applyProps), input.decorator.ts' },
        { task: 'Change how @for reconciles a list', files: 'view.class.ts (addForDirective, flattenForDisplay)' },
    ];

    dummyClassSample = `class Counter extends ReactiveClass {
    @State() count = 0;
    @State() user = { name: 'Ada', tags: ['core'] };

    note = ''; // plain field -- safe to write from an effect

    @Effect((ctx: Counter) => [ctx.count])
    logCount(prev?: number){
        this.note = 'was ' + prev + ', now ' + this.count;
    }
}

const c = new Counter();
c.count++;            // accessor setter  -> runSubscribers
c.user.name = 'Bo';   // Proxy set trap   -> runSubscribers
c.user.tags.push('ui'); // nested array trap -> runSubscribers`;

    dummyMapsSample = `// after construction, before @Component init():
c.effectSubscribers
// Map { (ctx => [ctx.count]) => "logCount" }

c.effectDepFnPreviousValue
// Map { }   // empty until the first runSubscribers

c.computedSubscribers
// Map { }   // implementation pending -- @Computed is a passthrough

c.otherSubscriptions
// []        // @Component init() will push the DOM walker`;

    dummyStateDecoratorSample = `// @State field decorator, simplified from state.decorator.ts
ctx.addInitializer(function(){
    let value = this[ctx.name];
    Object.defineProperty(this, ctx.name, {
        get(){ return value; },
        set(val){
            value = val;          // primitives and reassignment both land here
            this.runSubscribers();
        }
    });
});

return function(val){
    // initial value only: numbers/strings returned as-is,
    // objects/arrays/Maps/Sets recursively Proxy-wrapped
    return Proxify.get(val, name, this, null, () => this.runSubscribers());
};`;

    dummyRunSubscribersSample = `runSubscribers(){
    this.effectSubscribers.forEach((effectFnName, dependency) => {
        const latest = dependency(this);          // e.g. [this.count]
        const prev = this.effectDepFnPreviousValue.get(dependency);
        if(prev){
            for(let i = 0; i < latest.length; i++){
                if(latest[i] !== prev[i]){
                    this[effectFnName].call(this, prev[i]);
                }
            }
        }
        else {
            for(let i = 0; i < latest.length; i++){
                this[effectFnName].call(this, undefined);
            }
        }
        this.effectDepFnPreviousValue.set(dependency, latest);
    });
    this.otherSubscriptions.forEach(fn => fn.call(this));
}`;

    singleElSource = `<div class="box">{count}</div>`;

    singleElEmit = `module.exports = [{
  type: 0,                    // NODE_OBJ_TYPE.HTML_ELEMENT
  name: 'div',
  ref: 'null',
  attributes: { "class": "box", },
  props: {},
  eventHandlers: {},
  children: [
    function(){ return this.count },
  ],
}]`;

    multiRootSource = `<h1>{title}</h1>
<p>{body}</p>`;

    multiRootEmit = `module.exports = [
  { type: 0, name: 'h1', /* ... */ children: [
      function(){ return this.title },
  ]},
  { type: 0, name: 'p',  /* ... */ children: [
      function(){ return this.body },
  ]},
]
// View.root is this array -- two top-level DOM nodes`;

    eventSource = `<button class={done ? 'on' : 'off'} @click={inc}>
  {count}
</button>`;

    eventEmit = `{
  type: 0,
  name: 'button',
  attributes: {
    "class": function(){ return this.done ? 'on' : 'off' },
  },
  eventHandlers: {
    "click": function(){ return this.inc },
  },
  children: [
    function(){ return this.count },
  ],
}`;

    interpolationTemplateSample = `<div>{count}</div>
<div>{count + 1}</div>
<div class={mood}>{user.name}</div>`;

    interpolationTranspileSample = `// interpolationTranspiler.ts, simplified
readVar(name){
    const base = name.split('.')[0];   // "count" from "count + 1"
    if(localVars.includes(base)) return name;   // @for locals
    return 'this.' + name;
}

// {count}            -> function(){ return this.count }
// {count + 1}        -> function(){ return this.count + 1 }
// {user.name}        -> function(){ return this.user.name }
// {item.label} in @for(item : items)
//                    -> function(item){ return item.label }
// {done ? 'on' : 'off'} as an attribute
//                    -> attributes.class = function(){ return this.done ? 'on' : 'off' }`;

    interpolationBuildSample = `// View.buildInterpolationNode for {count} in the template tab
const text = interpolation.call(this.component);   // "0"
const textNode = document.createTextNode(text);
this.component.reactiveElements.set(textNode, () => {
    textNode.textContent = interpolation.call(this.component);
});
return textNode;

// next runSubscribers -> otherSubscriptions -> that updater
// unmount deletes the Text node key from the Map`;

    interpolationExampleTabs = [
        { key: 'template', label: 'template.be', code: this.interpolationTemplateSample },
        { key: 'compiled', label: 'compiled fns', code: this.interpolationTranspileSample },
        { key: 'runtime', label: 'buildInterpolationNode', code: this.interpolationBuildSample },
    ];

    interpolationArgsSample = `// inside @for(index, item : items) the visitor pushes scope
// so every interpolation/attribute/event in the body is:
function(index, item){ return item.label }

// View.buildNodeTree(body, args) passes those extra args:
const itemArgs = [...parentArgs, index, item];
interpolation.call(this.component, ...itemArgs)
//                    ^ this is still the component
//                      index / item are parameters, not this.index`;

    notifyTickTemplate = `<p class={mood}>{count}</p>
<Badge $label={name} />`;

    notifyTickClass = `@Component({
    selector: 'Parent',
    useTemplate: template,
    useStyleSheets: []
})
class Parent extends ReactiveClass {
    @State() count = 0;
    @State() mood = 'ok';
    @State() name = 'Ada';
}

// @Component init() -- the only bridge from ReactiveClass to the DOM
this.addOtherSubscription(() => {
    this.reactiveElements.forEach((fn) => fn.call(this));
});`;

    notifyTickAfterMount = `// Parent.reactiveElements after View.buildNodeTree of parent.template.be

<p>                        -> setAttribute('class', this.mood)
Text("0")                  -> textContent = this.count
Comment("component:Badge") -> applyProps(badge, { label: fn })

// this.count++ (accessor on Parent)
//   Parent.runSubscribers()
//     1. effects
//     2. otherSubscriptions[0]() walks ALL three entries
//        including $label, even though count did not change name
//
// there is no "which fields did the interpolation read?"
// a write to mood still re-runs the {count} Text updater`;

    notifyTickTabs = [
        { key: 'template', label: 'parent.template.be', code: this.notifyTickTemplate },
        { key: 'component', label: 'parent.ts', code: this.notifyTickClass },
        { key: 'bindings', label: 'after mount', code: this.notifyTickAfterMount },
    ];

    parentTemplate = `<p>{name}</p>
<Badge $label={name} @onPing={ping} />`;

    parentClass = `@Component({
    selector: 'Parent',
    useTemplate: template,
    useStyleSheets: []
})
class Parent extends ReactiveClass {
    @State() name = 'Ada';
    ping(){ this.name = this.name + '!'; }
}`;

    badgeTemplate = `<button @click={onPing}>{label}</button>`;

    badgeClass = `@Component({
    selector: 'Badge',
    useTemplate: template,
    useStyleSheets: []
})
class Badge extends ReactiveClass {
    @Input() label = '';
    onPing?: () => void;    // plain field, not @Input
}`;

    parentChildTabs = [
        { key: 'parent-template', label: 'parent.template.be', code: this.parentTemplate },
        { key: 'parent', label: 'parent.ts', code: this.parentClass },
        { key: 'child-template', label: 'badge.template.be', code: this.badgeTemplate },
        { key: 'child', label: 'badge.ts', code: this.badgeClass },
    ];

    applyPropsSample = `// View.buildComponent -- runs in the PARENT's View
const anchor = document.createComment('component:Badge');
const child = new Badge();                // child's View + init() already ran
applyProps(child, htmlObj.props, args);   // first paint
applyProps(child, htmlObj.eventHandlers, args);

parent.reactiveElements.set(anchor, () => {
    applyProps(child, htmlObj.props, args);
    applyProps(child, htmlObj.eventHandlers, args);
});

function applyProps(instance, values, args){
    for(const key in values){
        let val = values[key];
        if(typeof val === 'function')
            val = val.call(this.component, ...args);  // eval on PARENT
        instance[key] = val;                          // write on CHILD
    }
}`;

    inputSetterSample = `// @Input -- input.decorator.ts
set(val){
    if(value === val) return;     // same number / same object identity
    value = val;
    this.runSubscribers();        // CHILD tick, not parent
}

// so:
//   parent.name = 'Bo'                 -> new string -> child notifies
//   parent.name = parent.name          -> skipped
//   parent.user.name = 'Bo' with $user={user}
//     parent notifies, applyProps assigns the SAME proxy
//     child Input sees === and skips
//     child {user.name} stays stale -- mutate through a primitive $prop
//     or reassign the object if the child must refresh`;

    counterTemplateSample = `<button @click={inc}>{count}</button>`;

    counterClassSample = `import template from './counter.template.be';

@Component({
    selector: 'Counter',
    useTemplate: template,
    useStyleSheets: []
})
class Counter extends ReactiveClass {
    @State() count = 0;
    inc(){ this.count++; }
}

// the decorator subclasses Counter and adds:
static _template = template;
get template(){ return Counter._template; }
reactiveElements = new Map();       // Node -> updater
view = new View(this, parent);      // buildNodeTree() of counter.template.be
init(){
    this.addOtherSubscription(() => {
        this.reactiveElements.forEach(fn => fn.call(this));
    });
}`;

    counterBindingsSample = `// View.buildNodeTree of counter.template.be
//   <button @click={inc}>{count}</button>

DOM
  <button>              // document.createElement('button')
    click listener      // addEventListener('click', inc) -- bound once
    Text("0")           // {count} evaluated with count === 0

reactiveElements
  Text("0")  ->  () => {
                   textNode.textContent = interpolation.call(component)
                   // interpolation is function(){ return this.count }
                 }

  // the <button> is NOT a Map key -- @click is not a binding
  // a literal class="..." would also stay out of the Map

// after init()
otherSubscriptions = [
  () => this.reactiveElements.forEach(fn => fn.call(this))
]

// this.count++ then walks that one Map entry
// the same button's label becomes "1"`;

    counterBootstrapSample = `// packages/core/src/bootstrap/bootstrap.ts
export default function bootstrap(el, rootNode){
    if(!el) el = document.body;
    const roots = rootNode.view.root;   // Counter: the <button> node
    const frag = document.createDocumentFragment();
    roots.forEach(node => frag.appendChild(node));
    el.appendChild(frag);
}

const root = document.getElementById('root');
bootstrap(root, new Counter());`;

    counterExampleTabs = [
        { key: 'template', label: 'counter.template.be', code: this.counterTemplateSample },
        { key: 'component', label: 'counter.ts', code: this.counterClassSample },
        { key: 'bindings', label: 'after mount', code: this.counterBindingsSample },
        { key: 'bootstrap', label: 'bootstrap.ts', code: this.counterBootstrapSample },
    ];

    ifSource = `@if(count % 2 === 0){
  <span>even</span>
}
@else-if(count % 3 === 0){
  <span>by three</span>
}
@else{
  <span>odd</span>
}`;

    ifEmit = `{
  type: 1,                 // NODE_OBJ_TYPE.DIRECTIVE
  name: 'ifElse',
  children: [
    [ function(){ return this.count % 2 === 0 }, [
        { type: 0, name: 'span', children: ["even",] }
    ]],
    [ function(){ return this.count % 3 === 0 }, [
        { type: 0, name: 'span', children: ["by three",] }
    ]],
    [ null, [
        { type: 0, name: 'span', children: ["odd",] }
    ]],
  ]
}`;

    ifRuntimeSample = `// addIfElseDirective -- one comment, at most one mounted body

const comment = document.createComment('if');   // always in the parent
let lastIndex = -1;
let nodes = [];

function paint(){
    const next = firstTruthyIndex(children);    // 0, 1, 2, or -1
    if(next === lastIndex) return;              // same branch -- keep DOM
    nodes.forEach(unMountNode);                 // drop old branch + its Map entries
    nodes = next === -1 ? [] : buildNodeTree(children[next][1]);
    comment.nodeChild = nodes;
    lastIndex = next;
    queueMicrotask(() => insertAfter(comment, nodes));
}

paint();                                        // first paint
reactiveElements.set(comment, paint);           // every later parent tick
`;

    ifChangeSample = `count = 2   // even -- first paint
<!--if-->
  <span>even</span>          // buildNodeTree(branch 0)  lastIndex = 0

count = 4   // still even
paint() sees next === 0 === lastIndex
  return immediately         // the <span> stays
  but { } inside the span still refresh:
  they have their own reactiveElements entries on THIS component

count = 3   // not even, is % 3
paint() sees next === 1 !== 0
  unMountNode(<span>even</span>)   // remove + delete Map keys
  nodes = buildNodeTree(branch 1)  // brand new <span>by three</span>
  insert after <!--if-->
  lastIndex = 1

count = 1   // neither -- @else
same swap: destroy branch 1, mount branch 2 (<span>odd</span>)

// no @else and every condition false:
unMountNode(everything); nodes = []; lastIndex = -1
<!--if--> remains; nothing after it`;

    forSource = `@for(index, item : items; key = trackById){
  <li>{index + ': ' + item.label}</li>
}`;

    forEmit = `{
  type: 1,
  name: 'for',
  itemVar: 'item',
  indexVar: 'index',
  source: function(){ return this.items },   // re-read on every tick
  keyFn: function(){ return this.trackById },
  body: [
    // STAMP -- one row's worth of template, not the whole list.
    // Runtime calls buildNodeTree(body, [index, item]) once PER entry.
    // 3 items => 3 separate <li>s, each with its own Text + Map entries.
    { type: 0, name: 'li', children: [
        function(index, item){ return index + ': ' + item.label },
    ]}
  ]
}`;

    forRuntimeSample = `// addForDirective
const anchor = document.createComment('for');   // one, for the whole list
let keyedEntries = new Map();                   // key -> { comment, item, index }

function render(){
    const items = source.call(component);       // current array
    const next = new Map();
    const order = [];

    items.forEach((item, index) => {
        const key = trackById(item, index);     // or index, if no keyFn
        const existing = keyedEntries.get(key);

        if(existing && existing.item === item && existing.index === index){
            next.set(key, existing);            // REUSE this row's DOM
            order.push(existing.comment);
            return;
        }

        if(existing) unMountNode(existing.comment);  // same key, different item/index

        const row = document.createComment('for-item');
        const nodes = buildNodeTree(body, [index, item]);  // STAMP the row
        row.nodeChild = nodes;
        next.set(key, { comment: row, item, index });
        order.push(row);
    });

    keyedEntries.forEach((entry, key) => {
        if(!next.has(key)) unMountNode(entry.comment);     // gone from array
    });

    keyedEntries = next;
    anchor.nodeChild = order;
    queueMicrotask(() => spliceRowsAfter(anchor, order));
}

render();                                       // first paint
reactiveElements.set(anchor, render);           // every later parent tick
`;

    forChangeSample = `items = [
  { id: 1, label: 'A' },
  { id: 2, label: 'B' },
]

// first paint -- two stamps of body
<!--for-->
  <!--for-item-->   key=1  index=0  item=A
    <li>0: A</li>
  <!--for-item-->   key=2  index=1  item=B
    <li>1: B</li>

items.push({ id: 3, label: 'C' })
render()
  key 1,2: same item ref AND same index -> REUSE
  key 3: new -> buildNodeTree(body, [2, C]) -> new <li>2: C</li>
  no leftover keys to delete
<!--for-->
  ...A...  ...B...  ...C...      // C spliced after B

items.pop()   // drop C
render()
  key 1,2 reuse
  key 3 not in next -> unMountNode(C's for-item)
                       removes <li>, deletes its Text from reactiveElements
<!--for-->
  ...A...  ...B...

items.splice(0, 1)   // drop A, B slides to index 0
render()
  key 1 gone -> unMountNode(A)
  key 2: same item ref BUT index 1 !== 0 -> DESTROY and rebuild B
          (reuse requires key AND item AND index)

item.done = !item.done   // in-place, same object, same index
render()
  reuse the <li>
  {item.label} inside it still updates: that Text is in reactiveElements
`;

    ifExampleTabs = [
        { key: 'template', label: 'template.be', code: this.ifSource },
        { key: 'emitted', label: 'emitted JS', code: this.ifEmit },
        { key: 'runtime', label: 'runtime', code: this.ifRuntimeSample },
        { key: 'changes', label: 'when count changes', code: this.ifChangeSample },
    ];

    forExampleTabs = [
        { key: 'template', label: 'template.be', code: this.forSource },
        { key: 'emitted', label: 'emitted JS', code: this.forEmit },
        { key: 'runtime', label: 'runtime', code: this.forRuntimeSample },
        { key: 'changes', label: 'when the array changes', code: this.forChangeSample },
    ];
}
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
exports.Contributing = void 0;
const core_1 = require("@beautiful-eyes/core");
const contributing_template_be_1 = __importDefault(require("./contributing.template.be"));
require("./code-viewer.component");
let Contributing = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'Contributing',
            useTemplate: contributing_template_be_1.default,
            useStyleSheets: []
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = core_1.ReactiveClass;
    let _activeSection_decorators;
    let _activeSection_initializers = [];
    let _activeSection_extraInitializers = [];
    let _navOpen_decorators;
    let _navOpen_initializers = [];
    let _navOpen_extraInitializers = [];
    var Contributing = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.activeSection = __runInitializers(this, _activeSection_initializers, 'overview');
            this.navOpen = (__runInitializers(this, _activeSection_extraInitializers), __runInitializers(this, _navOpen_initializers, false));
            this.toc = (__runInitializers(this, _navOpen_extraInitializers), [
                { key: 'overview', label: 'Overview', heading: 'Start' },
                { key: 'architecture', label: 'Architecture', heading: 'Internals' },
                { key: 'state', label: 'ReactiveClass', heading: '' },
                { key: 'compiler', label: 'Template compiler', heading: '' },
                { key: 'interpolation', label: 'Interpolations', heading: '' },
                { key: 'component', label: '@Component and bootstrap', heading: '' },
                { key: 'view', label: 'View class', heading: '' },
                { key: 'children', label: 'Parent to child', heading: '' },
                { key: 'ifelse', label: '@if / @else', heading: '' },
                { key: 'for', label: '@for', heading: '' },
                { key: 'lookup', label: 'Where to look', heading: 'Reference' },
            ]);
            this.beFacts = [
                { title: 'Proxy-based state', body: '@State wraps objects, arrays, Maps, and Sets. Mutate in place and that instance\'s bindings update -- no immutable-update boilerplate.' },
                { title: 'Per-instance subscribers', body: 'A write notifies exactly this instance. There is no global store and no app-wide re-render.' },
                { title: 'No virtual DOM', body: 'Each text node, attribute, @if branch, and @for row updates itself. View builds real DOM once and patches bindings.' },
                { title: 'Angular-like surface', body: 'Decorators on TypeScript classes (@Component, @State, @Effect, @Input) and a separate .template.be file, not JSX.' },
                { title: 'Vue-like change detection', body: 'Reactivity is Proxy interception on values you already read and write, not compiler-injected signals.' },
            ];
            this.contributeSteps = [
                { title: 'Install', body: 'Clone the repo, npm install at the workspace root. Node workspaces wire every package under packages/.' },
                { title: 'Run something', body: 'npm run start:qa is the smallest app. npm run start:docs is this site, itself written in Beautiful Eyes.' },
                { title: 'Read Architecture, then the matching topic', body: 'Architecture is the map. Then open the topic for the file you will touch -- compiler before lexer.ts, View class before view.class.ts.' },
                { title: 'Change one concern', body: 'Small pull requests are easier to review than a rewrite. Match the style of the file you are in.' },
                { title: 'Open an issue or PR', body: 'The project is spare-time and marked work in progress. Issues and pull requests are welcome.' },
            ];
            this.folderTree = `Beautiful-Eyes/
  package.json                 npm workspaces root
  packages/
    template-compiler/         .template.be -> JS module
    reactiveClass/             ReactiveClass, @State, @Effect, @Input
    core/                      @Component, View, bootstrap
    lib/                       Proxify, shared types, TaskQueue stub
    dynamic-import/            TS transformer (static import -> dynamic)
    create/                    npx @beautiful-eyes/create scaffolder
    qa/                        smallest runnable example app
    docs/                      this documentation site`;
            this.contributeCommands = `git clone <this-repo-url>
cd Beautiful-Eyes
npm install
npm run start:qa       # example app
npm run start:docs     # this site`;
            this.packages = [
                { name: 'template-compiler', body: 'Webpack loader that compiles .template.be files (lexer -> parser -> AST -> visitor) into a plain JS module.' },
                { name: 'reactiveClass', body: 'The reactivity primitives -- ReactiveClass, @State, @Effect, @Computed, @Input.' },
                { name: 'core', body: 'Turns a compiled template into real DOM, wires up reactivity, implements the component system.' },
                { name: 'lib', body: 'Shared utilities -- the Proxy machinery, shared types, a task queue.' },
                { name: 'dynamic-import', body: 'A TypeScript transformer: rewrites static imports into dynamic ones.' },
                { name: 'qa', body: 'A small example app used to exercise the framework end-to-end.' },
                { name: 'docs', body: 'This site -- itself a Beautiful Eyes app.' },
                { name: 'create', body: 'npx @beautiful-eyes/create -- copies a webpack starter and installs dependencies.' },
            ];
            this.pendingItems = [
                { name: '@Computed()', body: 'Passthrough getter -- no caching, no dependency tracking. computedSubscribers and addComputedSubscribers exist but are unused. Implementation pending.' },
                { name: '@switch / @case', body: 'Tokens and parseSwitch() exist; the parser body is empty. Use an @if / @else-if chain.' },
                { name: '#ref', body: 'Parsed as reserved syntax, not wired to a live element reference.' },
                { name: 'TaskQueue / comitBatchedItems', body: 'Imported and stubbed; @State notifies runSubscribers synchronously today.' },
                { name: 'destroyed()', body: 'Empty method on the component subclass; nothing in View calls it on unmount.' },
            ];
            this.archLayers = [
                { when: 'Compile time', who: 'template-compiler + webpack', body: 'A .template.be import becomes a JS array. The browser never sees the source text. View only receives HtmlObj, functions, and DirectiveObj.' },
                { when: 'Construct', who: 'reactiveClass + @Component + View', body: '@State installs accessors/Proxies. View.buildNodeTree walks the compiled array, creates real DOM, and fills reactiveElements. init() hooks that Map into otherSubscriptions.' },
                { when: 'Mount', who: 'bootstrap', body: 'Appends view.root. Does not compile, bind, or tick. Directive bodies insert on a microtask once comment anchors have a parentNode.' },
                { when: 'Tick', who: 'runSubscribers', body: 'A write on this instance runs effects, then every Map updater. There is no dirty-check of which interpolations read which fields. A child ticks only if applyProps writes a new @Input value.' },
            ];
            this.archFiles = [
                { file: 'packages/template-compiler', body: 'Lexer, parser, AST, stringify. webpack loader entry is index.ts transform().' },
                { file: 'packages/reactiveClass', body: 'ReactiveClass maps, @State, @Effect, @Input. Per-instance notify.' },
                { file: 'packages/lib/src/Proxy', body: 'Proxify wraps objects/arrays/Maps/Sets. Traps call the same runSubscribers callback.' },
                { file: 'packages/core/src/component', body: '@Component subclass, ComponentRegistry, reactiveElements, init().' },
                { file: 'packages/core/src/View/view.class.ts', body: 'buildNodeTree, bindings, @if / @for, child components, unmount.' },
                { file: 'packages/core/src/bootstrap/bootstrap.ts', body: 'Fragment-append view.root onto the mount element.' },
            ];
            this.archStorySample = `// one dummy used across this guide -- Counter

// counter.template.be
<button @click={inc}>{count}</button>

// counter.ts
@Component({ selector: 'Counter', useTemplate: template, useStyleSheets: [] })
class Counter extends ReactiveClass {
    @State() count = 0;
    inc(){ this.count++; }
}

bootstrap(document.getElementById('root'), new Counter());


// COMPILE TIME (webpack, once)
transform(source)
  Lexer  -> tokens  TAG_OPEN, TAG_NAME, ATTRIBUTE_NAME(@click), INTERPOLATION({inc}), ...
  Parser -> HtmlElement button, eventHandlers.click, children Interpolation "count"
  Stringify ->
    [{ type: 0, name: 'button',
       eventHandlers: { click: function(){ return this.inc } },
       children: [ function(){ return this.count } ] }]


// RUNTIME -- new Counter()
1. super() / @State initializer
     count is a number -> Proxify.get returns 0 as-is
     accessor getter/setter installed
2. subclass field  view = new View(this)
     buildNodeTree walks the array
       button = createElement('button')
       addEventListener('click', inc)          // NOT in the Map
       Text("0") + reactiveElements.set(text, updater)
     view.root = [button]
3. init()
     otherSubscriptions.push(() => reactiveElements.forEach(fn => fn()))
4. bootstrap
     append button into #root
     (if this template had @if/@for, those bodies insert on a microtask)


// CLICK -- inc() { this.count++ }
accessor setter stores 1, calls runSubscribers()
  effects first (none here)
  otherSubscriptions[0] walks the Map
    Text updater: textContent = interpolation.call(component)  // "1"

// that is the whole architecture:
//   compile array  ->  View stamps DOM + Map  ->  write notifies  ->  Map paints
`;
            this.archTickSample = `// packages that run on a tick -- teaching shape

@State setter / Proxy trap
  -> instance.runSubscribers()            // reactiveClass.ts

runSubscribers
  1. effectSubscribers: depFn(this) vs previous array, call effects
  2. otherSubscriptions: one fn pushed by @Component init()
       reactiveElements.forEach(updater => updater())

reactiveElements keys (filled by View, owned by this instance)
  Text node        -> textContent = fn()
  Element          -> re-apply dynamic attrs
  Comment if       -> paint() maybe remount a branch
  Comment for      -> render() reuse / stamp / unmount rows
  Comment component-> applyProps onto the child

NOT in the Map
  @click listeners
  literal attributes  class="box"
  child interpolations -- those live on the CHILD Map
`;
            this.architectureTabs = [
                { key: 'story', label: 'Counter end to end', code: this.archStorySample },
                { key: 'tick', label: 'what a tick runs', code: this.archTickSample },
            ];
            this.stateFiles = [
                { file: 'reactiveClass/src/reactiveClass/reactiveClass.ts', body: 'Per-instance maps. runSubscribers is the only notify entry.' },
                { file: 'reactiveClass/src/state/state.decorator.ts', body: 'Field accessor + Proxify.get on the initial value.' },
                { file: 'lib/src/Proxy/proxify/proxify.ts', body: 'Recursive Proxy. set / deleteProperty call the notify callback.' },
                { file: 'reactiveClass/src/effect/effect.decorator.ts', body: 'addInitializer stores depFn -> method name. Method body is unchanged.' },
                { file: 'reactiveClass/src/input/input.decorator.ts', body: 'Like @State with === skip. Used on child fields the parent writes.' },
                { file: 'reactiveClass/src/computed/computed.decotrator.ts', body: 'Passthrough getter today. Do not treat as live memoization.' },
            ];
            this.stateChangeTips = [
                'Keep effectSubscribers / otherSubscriptions on the instance, never static.',
                'A notify must call runSubscribers -- both the accessor setter and the Proxy trap already do.',
                'The setter does not re-run Proxify.get. If you want reassigned objects wrapped, that is new behavior.',
                'TaskQueue is imported and unused. Notifies are synchronous. Do not assume batching exists.',
                'Effects should write plain fields. Writing @State inside an effect re-enters runSubscribers.',
                '@Computed wiring is open work -- see Expectations on Overview. Leave it unless that is the PR.',
            ];
            this.stateProxifySample = `// lib/src/Proxy/proxify/proxify.ts -- teaching shape

Proxify.get(val, stateName, instance, parent, notify){
    if(val == null || typeof val === 'number' || typeof val === 'string')
        return val;                          // primitives: no Proxy

    const handler = {
        set(target, prop, value){
            Reflect.set(target, prop, value);
            notify();                        // same runSubscribers
            return true;
        },
        deleteProperty(target, prop){
            Reflect.deleteProperty(target, prop);
            notify();
            return true;
        }
    };

    if(Array.isArray(val))   return wrapArray(val, handler);   // recurse items
    if(isObject(val))        return wrapObject(val, handler);  // recurse keys
    if(val instanceof Map)   return wrapMap(val, handler);
    if(val instanceof Set)   return wrapSet(val, handler);
}

// @State() user = { name, tags: [] }
//   user        -> Proxy
//   user.tags   -> nested Proxy
//   user.name   -> raw string
//
// this.user = { name: 'Bo' }  hits the ACCESSOR, not Proxify.get again
// the new object is stored as-is unless you wrap it yourself
`;
            this.stateEffectSample = `// effect.decorator.ts -- teaching shape

export function Effect(dependencyFn){
    return function(target, context){
        context.addInitializer(function(){
            this.addEffectSubscribers(dependencyFn, context);
            // effectSubscribers.set(dependencyFn, "logCount")
        });
        return function(...args){
            return target.call(this, ...args);   // method unchanged
        };
    };
}

// depFn MUST return an array. runSubscribers compares by index with !==
@Effect((ctx) => [ctx.count, ctx.user.name])
sync(prev){ ... }

// first notify: no previous array -> called once per slot with undefined
// later: only slots whose value changed are called, with the OLD slot value
`;
            this.compilerFiles = [
                { file: 'template-compiler/index.ts', body: 'transform(source): Lexer, Parser, Stringify.eval, return module.exports = array.' },
                { file: 'src/lexer/lexer.ts', body: 'getNextToken. Meaning of @ $ { depends on prevToken. @for header is a special mode.' },
                { file: 'src/parser/parser.ts', body: 'parseTag, parseAttribute (@ event, $ prop, # ref), parseIfElse, parseFor.' },
                { file: 'src/nodes/*', body: 'AST classes: HtmlElement, Interpolation, StringNode, IfElse, For, HtmlAttribute, Ref.' },
                { file: 'src/visitors/stringify/stringify.ts', body: 'Emits the JS array View consumes. visitInterpolation uses interpolationTranspiler + scope stack.' },
                { file: 'src/interpolationTranspiler/interpolationTranspiler.ts', body: 'Prefix bare identifiers with this. unless they are @for locals.' },
                { file: 'src/visitors/codeGenerator/codeGenerator.ts', body: 'Exists, unused. transform() comments it out. Stringify is the live emit path.' },
                { file: 'src/visitors/visitor/visitor.ts', body: 'Scope stack for nested @for locals. Both visitors extend this.' },
            ];
            this.compilerChangeTips = [
                'A new token needs token.enum.ts, TokenFactory, lexer, parser, an AST node, Visitor + Stringify, and usually View.',
                'Attribute prefixes are decided in parser.parseAttribute from the first character of the name (@ $ #).',
                'Stringify output is the contract with View. If you add a field to HtmlObj, View.buildHtmlElement must read it.',
                'interpolationTranspiler does not understand JS -- it rewrites identifiers. Nested parens in @if/@for headers are not tracked.',
                'CodeGenerator is dead. Do not extend it expecting transform() to call it.',
                'Webpack config in packages/docs and packages/qa points at template-compiler/dist/index.js -- rebuild the compiler package after lexer/parser changes.',
            ];
            this.compilerTransformSample = `// template-compiler/index.ts -- this is the webpack loader

export default function transform(source){
    const lexer = new Lexer(source);
    const parser = new Parser(lexer);
    const ast = parser.parse();          // astNode[]
    const stringify = new Stringify();
    const js = stringify.eval(ast);      // "[ { type: 0, name: 'button', ... }, ]"
    return 'module.exports = ' + js;
}

// webpack (docs + qa):
//   test: /\\.template\\.be$/
//   use:  template-compiler/dist/index.js
`;
            this.compilerLexerSample = `// lexer.ts -- teaching shape of getNextToken

skip whitespace / newlines
if EOF -> END_OF_FILE
if insideForHeader -> getNextForHeaderToken()   // @for(...) until )

switch currentChar:
  '<'  -> TAG_OPEN
  '>'  -> TAG_CLOSE
  '/'  -> TAG_CLOSE_SLASH
  '='  -> ASSIGNMENT
  '@'  -> if prev was TAG_NAME / ATTRIBUTE_*  then readAttributeName (@click)
          else AT_THE_RATE  (start of @if / @for / @else)
  '$'  -> same: attribute name ($label) or DOLLAR
  '{'  -> INTERPOLATION  (read until matching '}' -- this one DOES track braces)
  '"' or "'" -> ATTRIBUTE_VALUE or TEXT depending on context

readAttributeName continues while the name is a valid attr char.
The parser later slices the prefix (@ $) and files the attribute
into eventHandlers, props, or attributes.

gotcha: @if(fn())  -- header scan stops at the first unmatched ')'
        the inner () of fn() closes the header. Use a getter instead.
`;
            this.compilerParserSample = `// parser.ts -- teaching shape

parseAttribute(){
    if name starts with '@' -> EVENT_HANDLER, slice '@'
    if name starts with '$' -> PROP, slice '$'
    if token is HASH        -> REF  (parsed, not wired at runtime)
    eat '='
    if value is interpolation -> Interpolation AST
    else                      -> StringNode
}

parseTag(){
    eat '<' name
    while not '>' : parseAttribute, bucket into attributes / events / props / ref
    if self-close  -> HtmlElement with no children
    else children = parse until '</name>'
}

parse() walks a sibling list until a stop token:
  '<'     -> parseTag
  '{'     -> Interpolation
  '@if'   -> parseIfElse
  '@for'  -> parseFor
  text    -> StringNode   (only if the run starts with a letter)

parseIfElse: [@if cond body], then @else-if..., then optional @else (cond = null)
parseFor:    item | index,item  :  source  ; optional key = methodName
`;
            this.compilerStringifySample = `// stringify.ts -- teaching shape of the emit View reads

visitHtmlElement(el){
    return \`{
      type: 0,
      name: '\${el.tagName}',
      attributes: { \${each attr} },
      props: { \${each $prop} },
      eventHandlers: { \${each @event} },
      children: [ \${each child} ],
    },\`;
}

visitInterpolation(node){
    const scope = this.currentScope();          // @for locals, nested
    const body = interpolationTranspiler(node.content, scope);
    return \`function(\${scope.join(',')}){return \${body}},\`;
}

visitIfElse(node){
    // children: [ [condFn | null, bodyArray], ... ]
}

visitFor(node){
    pushScope([indexVar?, itemVar])
    // body interpolations become function(index, item){ ... }
    popScope()
}

eval(ast){ return '[' + ast.map(n => n.acceptVisitor(this)).join('') + ']'; }
`;
            this.compilerSourceTabs = [
                { key: 'transform', label: 'transform()', code: this.compilerTransformSample },
                { key: 'lexer', label: 'lexer', code: this.compilerLexerSample },
                { key: 'parser', label: 'parser', code: this.compilerParserSample },
                { key: 'stringify', label: 'stringify', code: this.compilerStringifySample },
            ];
            this.interpolationFiles = [
                { file: 'interpolationTranspiler.ts', body: 'Rewrites count -> this.count. Leaves @for locals and string literals alone.' },
                { file: 'stringify.ts visitInterpolation', body: 'Wraps the rewritten expression in function(scope...){ return ... }.' },
                { file: 'view.class.ts buildInterpolationNode', body: 'First paint + Map entry on the Text node.' },
                { file: 'view.class.ts addAttributes', body: 'Function-valued attrs share one Map entry on the element.' },
                { file: 'component.decorator.ts init', body: 'Pushes the Map walker onto otherSubscriptions.' },
                { file: 'view.class.ts unMountNode / removeFromReactiveElements', body: 'Deletes Map keys so a destroyed node is not called on the next tick.' },
            ];
            this.interpolationChangeTips = [
                'There is no dependency list. If you add one, every interpolation, attr, @if, @for, and applyProps path has to opt in.',
                'Updaters close over args from @for. Changing how args are passed must stay in sync with stringify scope and buildNodeTree(body, args).',
                'Whitespace between two interpolations is dropped. That is lexer/parser, not View.',
                'unMountNode must delete Map keys. Leaving a Text node in the Map after remove() will throw or update a detached node forever.',
            ];
            this.componentFiles = [
                { file: 'core/src/component/component.decorator.ts', body: 'Subclasses the user class. Adds template getter, reactiveElements, View, init, destroyed stub.' },
                { file: 'core/src/component/componentRegistry.ts', body: 'selector -> constructor. Duplicate selector throws. View.buildHtmlElement looks up tag names here.' },
                { file: 'core/src/View/view.class.ts', body: 'Runs during the field initializer, before init().' },
                { file: 'core/src/bootstrap/bootstrap.ts', body: 'Append only. No compile, no bind.' },
            ];
            this.componentChangeTips = [
                'Construction order is super (@State) -> view = new View (bindings) -> init (hook Map) -> bootstrap (append). Do not move View after init or interpolations miss the walker.',
                'destroyed() is empty. If you add unmount-from-parent, View.unMountNode is the existing inverse.',
                'ComponentRegistry keys are selector strings from @Component({ selector }). Tag names in templates must match exactly, including case.',
                'useStyleSheets is accepted and unused. Do not document it as live CSS injection.',
            ];
            this.componentDecoratorSample = `// component.decorator.ts -- teaching shape

function Component(options){
    return function(UserClass){
        class Component extends UserClass {
            static _template = options.useTemplate;   // compiled array
            reactiveElements = new Map();             // Node -> updater
            _HtmlParent = document.body;              // unused for insert
            view = new View(this, this._HtmlParent);  // buildNodeTree NOW

            constructor(...args){
                super(...args);                       // @State first
                this.init();                          // hook Map second
            }

            init(){
                this.addOtherSubscription(() => {
                    this.reactiveElements.forEach(fn => fn.call(this));
                });
            }

            destroyed(){ /* empty -- not called today */ }

            get template(){ return Component._template; }
        }

        if(ComponentRegistry.has(options.selector))
            throw new Error('duplicate selector');
        ComponentRegistry.set(options.selector, Component);
        return Component;
    };
}

// View.buildHtmlElement:
const Ctor = ComponentRegistry.get(htmlObj.name);
if(Ctor) return buildComponent(...);   // <Badge />
else     createElement(htmlObj.name);  // <button>
`;
            this.viewFiles = [
                { file: 'view.class.ts constructor / buildNodeTree', body: 'Dispatch: string, function, HTML_ELEMENT, DIRECTIVE.' },
                { file: 'buildHtmlElement / buildComponent', body: 'Registry hit vs createElement. Child gets its own View.' },
                { file: 'buildInterpolationNode / addAttributes / addEventListeners', body: 'Map vs one-shot listeners.' },
                { file: 'addIfElseDirective / addForDirective', body: 'Comment holes, stamps, keyed reuse.' },
                { file: 'appendChildrenToParent / flattenForDisplay', body: 'Element appendChild vs comment.after. Cursor must skip a comment span.' },
                { file: 'unMountNode / removeFromReactiveElements', body: 'Destroy DOM + Map keys. Shared by @if swap, @for delete, child teardown.' },
            ];
            this.viewChangeTips = [
                'Comments are the public node of @if / @for / child components. Returning a wrapper element will break ul > li and CSS.',
                'queueMicrotask before comment.after -- first paint runs while view.root is detached.',
                'appendChildrenToParent must advance past flattenForDisplay(comment), not the comment itself.',
                'args is how @for locals reach interpolations. Nested @for concatenates. Keep that contract if you change stamping.',
                'updatorFunctions on View is unused. Bindings live on component.reactiveElements.',
                'parentEl on the constructor is unused for insert. bootstrap / appendChildrenToParent do that.',
            ];
            this.childrenFiles = [
                { file: 'view.class.ts buildComponent', body: 'new Child(), applyProps, comment updater re-applies props on parent ticks.' },
                { file: 'view.class.ts applyProps', body: 'Eval functions with the PARENT as this, assign onto the CHILD.' },
                { file: 'input.decorator.ts', body: '=== skip then runSubscribers on the child. That is the only child tick from a parent write.' },
                { file: 'componentRegistry.ts', body: 'Tag name lookup. Missing selector -> treated as a real DOM unknown tag.' },
            ];
            this.childrenChangeTips = [
                'Parent Map never walks child interpolations. If a child is stale, check applyProps + @Input ===, not the parent walker.',
                'Object $props pass the same proxy. Nested mutation will not tick the child.',
                '@onPing is applyProps onto a plain field, not addEventListener. The child must call it.',
                'Child @State is isolated. Parent-to-child is @Input. Child-to-parent is a callback field.',
            ];
            this.ifelseFiles = [
                { file: 'parser.ts parseIfElse', body: 'Walks @if, @else-if..., optional @else. @else stores null as the condition.' },
                { file: 'stringify.ts visitIfElse', body: 'Emits children: [ [condFn|null, bodyStamp], ... ].' },
                { file: 'view.class.ts addIfElseDirective', body: '<!--if--> + lastIndex + paint(). Same index keeps DOM.' },
                { file: 'view.class.ts unMountNode', body: 'Destroys the previous branch and its Map entries on a swap.' },
            ];
            this.ifelseChangeTips = [
                'Branches are created and destroyed, not hidden. That is why interpolations inside a hidden branch do not run -- they are not in the Map.',
                'The comment must stay in the parent when the body is empty.',
                'Lexer header scan has no nested-paren tracking. Document that in any new condition syntax.',
                'Nested @if inside @for is a comment in that row\'s nodeChild. unMountNode of the row must recurse.',
            ];
            this.ifParserSample = `// parser.parseIfElse -- teaching shape

eat @if ( cond ) { body }
branches.push([ new Interpolation(cond), body ])

while next is @else-if:
    eat @else-if ( cond ) { body }
    branches.push([ new Interpolation(cond), body ])

if next is @else:
    eat @else { body }
    branches.push([ null, body ])          // always matches if nothing above did

return new IfElse(branches)

// lone @else-if / @else throws (no leading @if)
// stringify: cond null emits the literal null, not a function
`;
            this.forFiles = [
                { file: 'parser.ts parseFor', body: 'item : source  or  index, item : source ; key = method.' },
                { file: 'stringify.ts visitFor', body: 'Pushes loop vars onto the visitor scope stack, emits body as a stamp.' },
                { file: 'view.class.ts addForDirective', body: '<!--for--> + keyed Map of <!--for-item-->. Reuse needs key AND item ref AND index.' },
                { file: 'view.class.ts flattenForDisplay', body: 'Moves a multi-node row as one block.' },
            ];
            this.forChangeTips = [
                'body is a stamp for ONE row. Never pre-expand the list at compile time -- length is unknown.',
                'Reuse is stricter than typical keyed lists: index must match too. A splice remounts shifted rows even with key = trackById. Changing that is a behavior change; tests in qa should cover push/pop/splice.',
                'Duplicate keys throw. Keep that -- silent overwrite would leak DOM.',
                'Nested @for concatenates args. Inner interpolations must still see outer item.',
                'Source expression has the same unmatched ) / ; header limit as @if.',
            ];
            this.forParserSample = `// parser.parseFor -- teaching shape

eat @for (
first = identifier
if next is ',':
    indexVar = first
    eat ','
    itemVar = identifier
else
    itemVar = first

eat ':'
source = interpolation          // this.items
optional: ';' 'key' '=' identifier   // trackById method name on the component
eat )
eat { body }
eat }

// stringify
source: function(){ return this.items }
keyFn:  function(){ return this.trackById }   // or null
pushScope([indexVar?, itemVar])
body interpolations: function(index, item){ return item.label }
popScope()
`;
            this.subscriberRows = [
                { name: 'effectSubscribers', type: 'Map<DependencyFn, EffectFnName>', who: '@Effect via addEffectSubscribers', role: 'depFn -> effect method name. runSubscribers diffs depFn(this) against effectDepFnPreviousValue and calls the method for each changed index.' },
                { name: 'effectDepFnPreviousValue', type: 'Map<DependencyFn, any>', who: 'runSubscribers', role: 'Last depFn result, so the next pass can compare by index. First run has no previous value, so the effect is called once per slot with undefined.' },
                { name: 'computedSubscribers', type: 'Map<string, Set<string>>', who: 'addComputedSubscribers -- implementation pending', role: 'Reserved for @Computed memoization. @Computed() is a passthrough getter today, so this map stays empty. Wiring it up is open work.' },
                { name: 'otherSubscriptions', type: 'Function[]', who: '@Component init via addOtherSubscription', role: 'Generic callbacks run after effects. The component pushes one function that walks reactiveElements.' },
            ];
            this.compileSteps = [
                { title: '.template.be source', body: 'Raw text: tags, {interpolations}, @if / @for, and $prop / @event / #ref attributes.' },
                { title: 'Lexer (lexer.ts)', body: 'Turns raw text into a token stream: TAG_OPEN, ATTRIBUTE_NAME, INTERPOLATION, IF, FOR, CURLEY_BRACKET_OPEN, and so on. Context-sensitive: what a character means depends on the previous token.' },
                { title: 'Parser (parser.ts)', body: 'Consumes the token stream, builds an AST: HtmlElement, Interpolation, StringNode, IfElse, For, HtmlAttribute, Ref.' },
                { title: 'Stringify visitor (visitors/stringify)', body: 'Walks the AST, emits a plain JS module -- an array of HtmlObj / DirectiveObj object literals and inline functions. NODE_OBJ_TYPE.HTML_ELEMENT is 0, DIRECTIVE is 1.' },
                { title: 'webpack', body: 'Treats that emitted JS as the loader\'s output. Importing a .template.be file gets you this compiled module as its default export, stored on the component as static _template.' },
            ];
            this.bindingKinds = [
                { title: 'Text interpolation', body: 'Text node in reactiveElements. Updater sets textContent = interpolation.call(component).' },
                { title: 'Dynamic attribute', body: 'Element in reactiveElements. Updater re-applies every function-valued attribute.' },
                { title: '@if / @else', body: 'Comment in reactiveElements. Re-checks conditions; remounts the body if the winning index changed.' },
                { title: '@for', body: 'Comment in reactiveElements. Rebuilds or reuses rows by key, then repositions.' },
                { title: 'Component props', body: 'Comment in reactiveElements. Re-applies $props onto the child instance @Input fields.' },
                { title: 'Event listener', body: 'Not in reactiveElements. addEventListener once at mount; the handler is not re-bound on notify.' },
            ];
            this.quickReference = [
                { task: 'Add a new attribute prefix (like $ or @)', files: 'lexer.ts (readAttributeName), parser.ts (parseAttribute)' },
                { task: 'Add a new structural directive', files: 'token.enum.ts, lexer.ts, parser.ts, a new AST node, Visitor + both visitors, view.class.ts' },
                { task: 'Change how @State reactivity works', files: 'reactiveClass.ts, state.decorator.ts, lib/src/Proxy/proxify' },
                { task: 'Change how components mount or receive props', files: 'view.class.ts (buildComponent), component.decorator.ts, componentRegistry.ts' },
                { task: 'Change how interpolations bind', files: 'interpolationTranspiler.ts, stringify.ts visitInterpolation, view.class.ts buildInterpolationNode' },
                { task: 'Change how parent props reach a child', files: 'view.class.ts (buildComponent, applyProps), input.decorator.ts' },
                { task: 'Change how the DOM is built or unmounted', files: 'view.class.ts (buildNodeTree, appendChildrenToParent, unMountNode)' },
            ];
            this.dummyClassSample = `class Counter extends ReactiveClass {
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
            this.dummyMapsSample = `// after construction, before @Component init():
c.effectSubscribers
// Map { (ctx => [ctx.count]) => "logCount" }

c.effectDepFnPreviousValue
// Map { }   // empty until the first runSubscribers

c.computedSubscribers
// Map { }   // implementation pending -- @Computed is a passthrough

c.otherSubscriptions
// []        // @Component init() will push the DOM walker`;
            this.dummyStateDecoratorSample = `// @State field decorator, simplified from state.decorator.ts
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
            this.dummyRunSubscribersSample = `runSubscribers(){
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
            this.stateSourceTabs = [
                { key: 'run', label: 'runSubscribers', code: this.dummyRunSubscribersSample },
                { key: 'state', label: '@State', code: this.dummyStateDecoratorSample },
                { key: 'proxy', label: 'Proxify', code: this.stateProxifySample },
                { key: 'effect', label: '@Effect', code: this.stateEffectSample },
            ];
            this.singleElSource = `<div class="box">{count}</div>`;
            this.singleElEmit = `module.exports = [{
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
            this.multiRootSource = `<h1>{title}</h1>
<p>{body}</p>`;
            this.multiRootEmit = `module.exports = [
  { type: 0, name: 'h1', /* ... */ children: [
      function(){ return this.title },
  ]},
  { type: 0, name: 'p',  /* ... */ children: [
      function(){ return this.body },
  ]},
]
// View.root is this array -- two top-level DOM nodes`;
            this.eventSource = `<button class={done ? 'on' : 'off'} @click={inc}>
  {count}
</button>`;
            this.eventEmit = `{
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
            this.interpolationTemplateSample = `<div>{count}</div>
<div>{count + 1}</div>
<div class={mood}>{user.name}</div>`;
            this.interpolationTranspileSample = `// interpolationTranspiler.ts, simplified
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
            this.interpolationBuildSample = `// View.buildInterpolationNode for {count} in the template tab
const text = interpolation.call(this.component);   // "0"
const textNode = document.createTextNode(text);
this.component.reactiveElements.set(textNode, () => {
    textNode.textContent = interpolation.call(this.component);
});
return textNode;

// next runSubscribers -> otherSubscriptions -> that updater
// unmount deletes the Text node key from the Map`;
            this.interpolationExampleTabs = [
                { key: 'template', label: 'template.be', code: this.interpolationTemplateSample },
                { key: 'compiled', label: 'compiled fns', code: this.interpolationTranspileSample },
                { key: 'runtime', label: 'buildInterpolationNode', code: this.interpolationBuildSample },
            ];
            this.interpolationArgsSample = `// inside @for(index, item : items) the visitor pushes scope
// so every interpolation/attribute/event in the body is:
function(index, item){ return item.label }

// View.buildNodeTree(body, args) passes those extra args:
const itemArgs = [...parentArgs, index, item];
interpolation.call(this.component, ...itemArgs)
//                    ^ this is still the component
//                      index / item are parameters, not this.index`;
            this.notifyTickTemplate = `<p class={mood}>{count}</p>
<Badge $label={name} />`;
            this.notifyTickClass = `@Component({
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
            this.notifyTickAfterMount = `// Parent.reactiveElements after View.buildNodeTree of parent.template.be

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
            this.notifyTickTabs = [
                { key: 'template', label: 'parent.template.be', code: this.notifyTickTemplate },
                { key: 'component', label: 'parent.ts', code: this.notifyTickClass },
                { key: 'bindings', label: 'after mount', code: this.notifyTickAfterMount },
            ];
            this.parentTemplate = `<p>{name}</p>
<Badge $label={name} @onPing={ping} />`;
            this.parentClass = `@Component({
    selector: 'Parent',
    useTemplate: template,
    useStyleSheets: []
})
class Parent extends ReactiveClass {
    @State() name = 'Ada';
    ping(){ this.name = this.name + '!'; }
}`;
            this.badgeTemplate = `<button @click={onPing}>{label}</button>`;
            this.badgeClass = `@Component({
    selector: 'Badge',
    useTemplate: template,
    useStyleSheets: []
})
class Badge extends ReactiveClass {
    @Input() label = '';
    onPing?: () => void;    // plain field, not @Input
}`;
            this.parentChildTabs = [
                { key: 'parent-template', label: 'parent.template.be', code: this.parentTemplate },
                { key: 'parent', label: 'parent.ts', code: this.parentClass },
                { key: 'child-template', label: 'badge.template.be', code: this.badgeTemplate },
                { key: 'child', label: 'badge.ts', code: this.badgeClass },
            ];
            this.applyPropsSample = `// View.buildComponent -- runs in the PARENT's View
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
            this.inputSetterSample = `// @Input -- input.decorator.ts
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
            this.counterTemplateSample = `<button @click={inc}>{count}</button>`;
            this.counterClassSample = `import template from './counter.template.be';

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
            this.counterBindingsSample = `// View.buildNodeTree of counter.template.be
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
            this.counterBootstrapSample = `// packages/core/src/bootstrap/bootstrap.ts
export default function bootstrap(el, rootNode){
    if(!el) el = document.body;
    const roots = rootNode.view.root;   // Counter: the <button> node
    const frag = document.createDocumentFragment();
    roots.forEach(node => frag.appendChild(node));
    el.appendChild(frag);
}

const root = document.getElementById('root');
bootstrap(root, new Counter());`;
            this.counterExampleTabs = [
                { key: 'template', label: 'counter.template.be', code: this.counterTemplateSample },
                { key: 'component', label: 'counter.ts', code: this.counterClassSample },
                { key: 'decorator', label: '@Component subclass', code: this.componentDecoratorSample },
                { key: 'bindings', label: 'after mount', code: this.counterBindingsSample },
                { key: 'bootstrap', label: 'bootstrap.ts', code: this.counterBootstrapSample },
            ];
            this.viewMethodRows = [
                { name: 'constructor', body: 'Stores the component, immediately runs buildNodeTree() and assigns view.root. The parentEl argument is unused for insertion -- bootstrap / appendChildrenToParent do that later.' },
                { name: 'root', body: 'Array of top-level HTMLElement | Text | Comment. A comment here is an @if, @for, or child component at the template root.' },
                { name: 'buildNodeTree', body: 'Walks a compiled array. string -> Text, function -> interpolation Text + Map entry, HtmlObj -> element or child component, DIRECTIVE -> if/for. The args extra array is @for loop variables passed into interpolations.' },
                { name: 'buildHtmlElement', body: 'ComponentRegistry.get(tagName) decides component vs real DOM. Real elements get events, attributes, then a recursive buildNodeTree of children appended into the element.' },
                { name: 'buildComponent', body: 'Comment component:Name, new Child(), applyProps, stash child.view.root on nodeChild, microtask-insert after the comment, Map entry re-applies props.' },
                { name: 'appendChildrenToParent', body: 'Element parent: appendChild. Comment parent: only if comment.parentNode is set, then after() each child. Nested comments expand via nodeChild; the cursor skips the whole flattenForDisplay span so the next sibling is not spliced into the middle.' },
                { name: 'flattenForDisplay', body: 'Comment plus every node in nodeChild, recursively. Used to move or skip a whole @for row (comment + li + nested if) as one unit.' },
                { name: 'unMountNode', body: 'If Comment, recurse nodeChild first. Then delete this node from reactiveElements and el.remove(). That is how a swapped @if branch or a popped @for row drops both DOM and bindings.' },
                { name: 'updatorFunctions', body: 'Declared, unused. Bindings go on component.reactiveElements instead.' },
            ];
            this.viewOverviewSample = `// packages/core/src/View/view.class.ts -- teaching shape

class View {
    root = [];                    // top-level nodes for bootstrap
    constructor(component){
        this.component = component;
        this.root = this.buildNodeTree();   // now, before init()
    }

    buildNodeTree(template = component.template, args = []){
        // args = [index, item] inside @for, else []
        return template.map(node => {
            if(typeof node === 'string')   return text(node);
            if(typeof node === 'function') return interpolation(node, args);
            if(node.name in registry)      return childComponent(node, args);
            if(node.name === 'ifElse')     return addIfElse(node, args);
            if(node.name === 'for')        return addFor(node, args);
            return realElement(node, args);
        });
    }
}

// every structural hole is a Comment with an extra JS property:
comment.nodeChild = [ /* nodes this comment owns */ ]
`;
            this.viewWalkthroughSample = `// dummy template this section walks

<div class="box">
  Hello {name}
  @if(open){ <span>yes</span> }
  @for(item : items){ <li>{item}</li> }
  <Badge $label={name} />
</div>

// compiled array View receives (teaching shape)

[
  {
    type: HTML_ELEMENT, name: 'div',
    attributes: { class: 'box' },
    children: [
      'Hello ',
      function(){ return this.name },
      { type: DIRECTIVE, name: 'ifElse', children: [ ... ] },
      { type: DIRECTIVE, name: 'for', source, body: [ ... ] },
      { type: HTML_ELEMENT, name: 'Badge', props: { label: fn } }
    ]
  }
]

// after buildNodeTree -- view.root[0] is the div

div.box
  Text "Hello "              // static, no Map
  Text "Ada"                 // interpolation, Map updater
  <!--if-->                  // Map paint(); nodeChild = [span]
    span "yes"
  <!--for-->                 // Map render(); nodeChild = [for-item...]
    <!--for-item-->
      li
        Text "A"             // interpolation, args = [item]
  <!--component:Badge-->     // Map applyProps; nodeChild = child.view.root
`;
            this.viewBuildTreeSample = `// how View builds the DOM tree -- teaching shape of buildNodeTree

function buildNodeTree(template, args = []){
    const out = [];
    for(const node of template){
        if(!node) continue;

        if(typeof node === 'string'){
            out.push(document.createTextNode(node));          // static text
        }
        else if(typeof node === 'function'){
            out.push(buildInterpolationNode(node, args));     // {expr}
        }
        else if(node.type === HTML_ELEMENT){
            out.push(buildHtmlElement(node, args));           // tag or child component
        }
        else if(node.type === DIRECTIVE){
            out.push(buildDirectives(node, args));            // @if / @for
        }
    }
    return out;
}

function buildHtmlElement(obj, args){
    const Ctor = ComponentRegistry.get(obj.name);
    if(Ctor) return buildComponent(obj, Ctor, args);

    const el = document.createElement(obj.name);
    addEventListeners(el, obj.eventHandlers, args);   // once
    addAttributes(el, obj.attributes, args);          // literals now, fns -> Map
    const kids = buildNodeTree(obj.children, args);   // recurse
    appendChildrenToParent(kids, el);                 // appendChild -- el is live-enough
    return el;
}

// top-level call: this.root = buildNodeTree()
// nested @for row: buildNodeTree(directive.body, [index, item])
`;
            this.viewBindSample = `// how View attaches bindings -- teaching shape

function buildInterpolationNode(fn, args){
    const text = fn.call(component, ...args);          // first paint
    const textNode = document.createTextNode(text);
    component.reactiveElements.set(textNode, () => {
        textNode.textContent = fn.call(component, ...args);
    });
    return textNode;
}

function addAttributes(el, attributes, args){
    const dynamic = [];
    for(const key in attributes){
        const val = attributes[key];
        if(typeof val === 'function') dynamic.push(key);
        else applyAttribute(el, key, val);             // class="box" -- once
    }
    if(!dynamic.length) return;
    const update = () => {
        dynamic.forEach(key => {
            applyAttribute(el, key, attributes[key].call(component, ...args));
        });
    };
    update();                                          // first paint
    component.reactiveElements.set(el, update);        // later ticks
}

function addEventListeners(el, handlers, args){
    for(const name in handlers){
        let fn = handlers[name].call(component, ...args);
        if(typeof fn === 'function') fn = fn.bind(component, ...args);
        el.addEventListener(name, fn);                 // NOT in the Map
    }
}

// init() later:
component.addOtherSubscription(() => {
    component.reactiveElements.forEach(fn => fn.call(component));
});
`;
            this.viewDirectiveSample = `// how View renders directives -- teaching shape

function buildDirectives(directive, args){
    if(directive.name === 'ifElse') return addIfElse(directive.children, args);
    if(directive.name === 'for')    return addFor(directive, args);
}

function addIfElse(branches, args){
    const comment = document.createComment('if');      // returned to parent
    let last = -1, nodes = [];

    function paint(){
        const i = firstTruthy(branches, args);         // or -1
        if(i === last) return;
        nodes.forEach(unMountNode);
        nodes = i === -1 ? [] : buildNodeTree(branches[i][1], args);
        comment.nodeChild = nodes;
        last = i;
        queueMicrotask(() => insertAfter(comment, nodes));
    }

    paint();
    component.reactiveElements.set(comment, paint);
    return comment;
}

function addFor(directive, args){
    const anchor = document.createComment('for');
    let keyed = new Map();

    function render(){
        const items = directive.source.call(component, ...args);
        const next = new Map(), order = [];

        items.forEach((item, index) => {
            const key = track(directive, item, index, args);
            const prev = keyed.get(key);
            if(prev && prev.item === item && prev.index === index){
                next.set(key, prev); order.push(prev.comment); return;
            }
            if(prev) unMountNode(prev.comment);

            const row = document.createComment('for-item');
            const rowArgs = directive.indexVar ? [...args, index, item] : [...args, item];
            row.nodeChild = buildNodeTree(directive.body, rowArgs);  // stamp
            next.set(key, { comment: row, item, index });
            order.push(row);
        });

        keyed.forEach((entry, key) => { if(!next.has(key)) unMountNode(entry.comment); });
        keyed = next;
        anchor.nodeChild = order;
        queueMicrotask(() => spliceRowsAfter(anchor, order));
    }

    render();
    component.reactiveElements.set(anchor, render);
    return anchor;
}
`;
            this.commentAnchorSample = `// comments are insertion holes that are not elements

<ul>
  <!--for-->                         // list hole -- always here
    <!--for-item-->                  // row 0 handle
      <li>0: A</li>
      <!--if-->                      // nested hole inside the row
        <span>open</span>
    <!--for-item-->                  // row 1 handle
      <li>1: B</li>
      <!--if-->                      // this row's if is false -- comment only
</ul>

// why not a wrapper <div>?
//   a extra element would break CSS (ul > li), flex, tables
//   a Comment has no box, no style, no tag name
//
// nodeChild (a JS property on the Comment, not a DOM API):
//   <!--if-->.nodeChild        = current branch nodes (or [])
//   <!--for-->.nodeChild       = ordered <!--for-item--> comments
//   <!--for-item-->.nodeChild  = that row's stamped nodes
//   <!--component:Badge-->.nodeChild = child.view.root
`;
            this.commentIfHelpSample = `<!--if--> jobs

1. Slot in the parent
   buildNodeTree returns the comment, not the <span>.
   The parent always has a stable node to sit next to
   siblings, even when the branch is empty.

2. Insertion cursor
   body is built in memory, then
   queueMicrotask(() => insertAfter(comment, nodes))
   because comment.after() needs comment.parentNode.
   First paint often runs before bootstrap appends view.root,
   so the microtask waits until the comment is in the live tree.

3. reactiveElements key
   the Map entry is the comment, not the <span>.
   paint() can replace the <span> without losing the updater.

4. Ownership for unmount
   comment.nodeChild lists what to destroy when the branch
   changes. unMountNode(comment) would walk that list.
   paint() walks nodeChild, then leaves the comment itself.

count even -> odd
  unMountNode(old <span>even</span>)   // not the <!--if-->
  newNodes = buildNodeTree(odd stamp)
  comment.nodeChild = newNodes
  insertAfter(comment, newNodes)
`;
            this.commentForHelpSample = `<!--for--> vs <!--for-item-->

<!--for-->  one per @for, never per row
  - the hole in the parent (same jobs as <!--if-->)
  - the reactiveElements key: render() is the updater
  - nodeChild = [for-item comments in current order]
    so unMountNode(the whole list) or a parent @if destroying
    this @for can walk every row

<!--for-item-->  one per live row
  - the handle render() stores in keyedEntries
  - reuse means keep this comment + its nodeChild
  - new row: create comment, stamp body, set nodeChild
  - delete row: unMountNode(this comment)
      -> recurse nodeChild (the <li>, nested <!--if-->)
      -> delete Map keys
      -> comment.remove()
  - reorder: flattenForDisplay(for-item)
      = [comment, <li>, nested comments, ...]
      move that span as one block after the previous row

without for-item, reuse would have to key the <li> itself.
a row whose stamp is several nodes (li + if-comment + span)
would have no single owner. for-item is that owner.
`;
            this.viewExampleTabs = [
                { key: 'overview', label: 'View overview', code: this.viewOverviewSample },
                { key: 'walk', label: 'dummy walkthrough', code: this.viewWalkthroughSample },
                { key: 'build', label: 'buildNodeTree', code: this.viewBuildTreeSample },
                { key: 'bind', label: 'attach bindings', code: this.viewBindSample },
                { key: 'directives', label: 'render directives', code: this.viewDirectiveSample },
                { key: 'comments', label: 'comment tree', code: this.commentAnchorSample },
            ];
            this.ifCommentTabs = [
                { key: 'if-comment', label: '<!--if--> jobs', code: this.commentIfHelpSample },
            ];
            this.forCommentTabs = [
                { key: 'for-comments', label: '<!--for--> and <!--for-item-->', code: this.commentForHelpSample },
            ];
            this.ifSource = `@if(count % 2 === 0){
  <span>even</span>
}
@else-if(count % 3 === 0){
  <span>by three</span>
}
@else{
  <span>odd</span>
}`;
            this.ifEmit = `{
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
            this.ifRuntimeSample = `// addIfElseDirective -- one comment, at most one mounted body

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
            this.ifChangeSample = `count = 2   // even -- first paint
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
            this.forSource = `@for(index, item : items; key = trackById){
  <li>{index + ': ' + item.label}</li>
}`;
            this.forEmit = `{
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
            this.forRuntimeSample = `// addForDirective
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
            this.forChangeSample = `items = [
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
            this.ifExampleTabs = [
                { key: 'template', label: 'template.be', code: this.ifSource },
                { key: 'parser', label: 'parseIfElse', code: this.ifParserSample },
                { key: 'emitted', label: 'emitted JS', code: this.ifEmit },
                { key: 'runtime', label: 'runtime', code: this.ifRuntimeSample },
                { key: 'changes', label: 'when count changes', code: this.ifChangeSample },
            ];
            this.forExampleTabs = [
                { key: 'template', label: 'template.be', code: this.forSource },
                { key: 'parser', label: 'parseFor', code: this.forParserSample },
                { key: 'emitted', label: 'emitted JS', code: this.forEmit },
                { key: 'runtime', label: 'runtime', code: this.forRuntimeSample },
                { key: 'changes', label: 'when the array changes', code: this.forChangeSample },
            ];
        }
        selectSection(key) {
            this.activeSection = key;
            this.navOpen = false;
            queueMicrotask(() => {
                const pane = document.querySelector('.contrib-content');
                if (pane)
                    pane.scrollTop = 0;
            });
        }
        toggleNav() {
            this.navOpen = !this.navOpen;
        }
        closeNav() {
            this.navOpen = false;
        }
    };
    __setFunctionName(_classThis, "Contributing");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _activeSection_decorators = [(0, core_1.State)()];
        _navOpen_decorators = [(0, core_1.State)()];
        __esDecorate(null, null, _activeSection_decorators, { kind: "field", name: "activeSection", static: false, private: false, access: { has: obj => "activeSection" in obj, get: obj => obj.activeSection, set: (obj, value) => { obj.activeSection = value; } }, metadata: _metadata }, _activeSection_initializers, _activeSection_extraInitializers);
        __esDecorate(null, null, _navOpen_decorators, { kind: "field", name: "navOpen", static: false, private: false, access: { has: obj => "navOpen" in obj, get: obj => obj.navOpen, set: (obj, value) => { obj.navOpen = value; } }, metadata: _metadata }, _navOpen_initializers, _navOpen_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Contributing = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Contributing = _classThis;
})();
exports.Contributing = Contributing;

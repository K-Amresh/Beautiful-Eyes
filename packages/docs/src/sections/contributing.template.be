<div class={navOpen ? 'contrib-layout nav-open' : 'contrib-layout'}>
  <div class="contrib-scrim" @click={closeNav}></div>
  <aside class="contrib-nav">
    <div class="contrib-nav-head">
      <span class="contrib-nav-title">{`Guide`}</span>
      <button class="contrib-nav-close" @click={closeNav} aria-label="Close topics">{`Close`}</button>
    </div>
    @for(item : toc){
      @if(item.heading){
        <p class="toc-label">{item.heading}</p>
      }
      <button class={activeSection === item.key ? 'contrib-nav-item active' : 'contrib-nav-item'} @click={() => selectSection(item.key)}>{item.label}</button>
    }
  </aside>
  <div class="contrib-content">
    <div class="contrib-toolbar">
      <button class="contrib-menu-btn" @click={toggleNav} aria-label="Open topics">
        <span class="contrib-burger"></span>
        <span>{`Topics`}</span>
      </button>
    </div>
    <article class="contrib-article">
@if(activeSection === 'overview'){
<h1>{`Overview`}</h1>
<p class="lede">{`This tab is the internals guide for people who want to change Beautiful Eyes, not only use it. Pick a topic in the side nav -- one pane at a time, instead of one long page.`}</p>
<p>{`Start at Architecture if you want the map first: compile time vs runtime, which package owns which job, and one Counter click walked through every layer. Then open the topic for the file you will edit.`}</p>

<h2>{`What is Beautiful Eyes`}</h2>
<p>{`A small reactive UI framework: decorator-based state, a compact HTML-like template language, and a component system, compiled ahead of time into plain DOM. This docs site is itself built with it.`}</p>
<ul>
@for(fact : beFacts){
  <li><strong>{fact.title}</strong>{` -- `}{fact.body}</li>
}
</ul>
<p>{`Inspiration: Vue for Proxy state, Svelte for skipping a virtual DOM, Solid for updating bindings instead of redrawing trees. The public surface is Angular-like classes and templates; the update model is per-instance subscribers, not a virtual tree.`}</p>

<h2>{`File and folder structure`}</h2>
<p>{`An npm-workspaces monorepo. The root package.json lists workspaces under packages/. Each package has one job -- keep it that way when you add files.`}</p>
<pre>{folderTree}</pre>
<table>
  <thead>
    <tr>
      <th>{`package`}</th>
      <th>{`what it does`}</th>
    </tr>
  </thead>
  <tbody>
  @for(pkg : packages){
    <tr>
      <td><code>{pkg.name}</code></td>
      <td>{pkg.body}</td>
    </tr>
  }
  </tbody>
</table>
<p>{`packages/qa is the smallest runnable app -- start there to see @Component and .template.be in a real tree. packages/docs is this site. core/src/View/view.class.ts is where compiled nodes become DOM.`}</p>

<h2>{`How to contribute`}</h2>
<p>{`The project is spare-time and marked work in progress. Issues and pull requests are welcome. A focused change that you have actually run is more useful than a large unfinished rewrite.`}</p>
<ol>
@for(step : contributeSteps){
  <li><strong>{step.title}</strong>{` -- `}{step.body}</li>
}
</ol>
<pre>{contributeCommands}</pre>
<p>{`There is no CLA and no required chat beyond the pull request. If a change is large, an issue first helps. Match the style of the file you are in -- this codebase is small enough that local convention matters more than a style guide.`}</p>

<h2>{`Expectations`}</h2>
<ul>
  <li>{`Read Architecture first, then the internals topic for the pipeline you are touching. The side nav is ordered the way a value actually moves: state, compiler, interpolations, @Component, View, children, @if, @for.`}</li>
  <li>{`Do not treat reserved grammar or empty methods as live behavior. The table below is open work -- if your PR is not about one of those items, leave them alone.`}</li>
  <li>{`Keep ReactiveClass maps per-instance, not static. A shared map lets one instance's effect run against a different this.`}</li>
  <li>{`Prefer a comparison or a getter in @if / @for headers. The lexer stops at the first unmatched closing paren.`}</li>
</ul>
<p>{`A few surfaces exist in the grammar or as empty methods but are not implemented yet:`}</p>
<table>
  <thead>
    <tr>
      <th>{`feature`}</th>
      <th>{`status`}</th>
    </tr>
  </thead>
  <tbody>
  @for(item : pendingItems){
    <tr>
      <td><code>{item.name}</code></td>
      <td>{item.body}</td>
    </tr>
  }
  </tbody>
</table>

<h2>{`How to read these docs`}</h2>
<p>{`Use the side nav. On a narrow screen, Topics opens the same list. Architecture is the map of the whole system. Each later topic zooms into one package and shows the teaching-shape of the real functions.`}</p>
<div class="callout">
  <span class="callout-title">{`Code examples are for explanation`}</span>
  <ul>
    <li>{`Tabbed snippets (template.be, emitted JS, runtime, after mount) are teaching models. They are pretty-printed, named for the dummy in that section, and often omit fields or collapse helpers. Real source in packages/ may differ -- line breaks, variable names, extra properties, and control flow.`}</li>
    <li>{`Emit shapes are real (NODE_OBJ_TYPE.HTML_ELEMENT is 0, DIRECTIVE is 1; interpolations are functions; @else is null). Do not paste a runtime tab into the compiler and expect it to compile.`}</li>
    <li>{`When you change the framework, trust the files in Where to look over anything on this page.`}</li>
  </ul>
</div>
}
@else-if(activeSection === 'architecture'){
<h1>{`Architecture`}</h1>
<p class="lede">{`Two clocks, one contract. Webpack compiles .template.be into a JS array. The browser constructs a component, View stamps real DOM and a Map of updaters, bootstrap appends, then a write on that instance walks the Map. There is no virtual DOM and no global store.`}</p>
<div class="diagram-wrap">
  <img class="diagram" src="/diagrams/architecture.svg" alt="Compile time produces a JS array. Runtime builds DOM and bindings, then a state write walks the Map."/>
</div>

<h2>{`The two clocks`}</h2>
<table>
  <thead>
    <tr>
      <th>{`when`}</th>
      <th>{`who`}</th>
      <th>{`what happens`}</th>
    </tr>
  </thead>
  <tbody>
  @for(row : archLayers){
    <tr>
      <td>{row.when}</td>
      <td><code>{row.who}</code></td>
      <td>{row.body}</td>
    </tr>
  }
  </tbody>
</table>

<h2>{`Which package owns which job`}</h2>
<p>{`Keep these boundaries. A compiler change should not need to touch ReactiveClass. A Proxy change should not need to touch stringify. View is the only runtime reader of the compiled array.`}</p>
<table>
  <thead>
    <tr>
      <th>{`package`}</th>
      <th>{`job`}</th>
    </tr>
  </thead>
  <tbody>
  @for(row : archFiles){
    <tr>
      <td><code>{row.file}</code></td>
      <td>{row.body}</td>
    </tr>
  }
  </tbody>
</table>

<h2>{`One dummy, every layer`}</h2>
<p>{`The rest of this guide reuses Counter -- a button that shows count and increments on click. Open the tabs: the compile of that template, construction, mount, then what this.count++ actually runs. Later topics zoom into each box.`}</p>
<CodeViewer $tabs={architectureTabs} />

<h2>{`Mental model to keep`}</h2>
<ul>
  <li>{`The compiled template is data -- an array of objects and functions -- not HTML. View interprets it.`}</li>
  <li>{`Each component instance is a ReactiveClass with its own maps. A write never walks another instance unless applyProps assigns an @Input.`}</li>
  <li>{`reactiveElements is a Map of live nodes to closures. otherSubscriptions is how ReactiveClass finds that Map. ReactiveClass does not import View.`}</li>
  <li>{`@if / @for / child components are comments plus stamps. The parent sees a Comment. The framework sees nodeChild.`}</li>
  <li>{`A tick re-runs every updater on that instance. There is no record of which interpolation read which field.`}</li>
</ul>
<p>{`Next: ReactiveClass if you are changing notify. Template compiler if you are changing .template.be syntax. View class if you are changing DOM. Parent to child if a nested component is stale.`}</p>
}
@else-if(activeSection === 'state'){
<h2 id="state">{`ReactiveClass -- maps, @State, Proxy, runSubscribers`}</h2>
<p>{`Every stateful class extends ReactiveClass. There is no global store and no fine-grained dependency graph. A write on this instance runs every effect and every DOM binding registered on this instance. Other instances are untouched.`}</p>
<h3>{`Where the code lives`}</h3>
<table>
  <thead>
    <tr>
      <th>{`file`}</th>
      <th>{`what to read`}</th>
    </tr>
  </thead>
  <tbody>
  @for(row : stateFiles){
    <tr>
      <td><code>{row.file}</code></td>
      <td>{row.body}</td>
    </tr>
  }
  </tbody>
</table>
<p>{`Open the tabs for the teaching-shape of the four functions that implement notify. Real source is a bit noisier -- TaskQueue is imported and unused, computedSubscribers is reserved.`}</p>
<CodeViewer $tabs={stateSourceTabs} />
<p>{`Start from a dummy class with one primitive field, one object field, and one effect:`}</p>
<pre>{dummyClassSample}</pre>
<p>{`The interesting part is not the syntax -- it is the collections hanging off that instance. They live in reactiveClass.ts and they are per-instance, not static. Keep them that way: a shared map would let one instance's effect run against a different this.`}</p>
<div class="diagram-wrap">
  <img class="diagram" src="/diagrams/subscriber-maps.svg" alt="ReactiveClass subscriber maps: effectSubscribers, computedSubscribers, otherSubscriptions, all feeding runSubscribers"/>
</div>
<table>
  <thead>
    <tr>
      <th>{`property`}</th>
      <th>{`type`}</th>
      <th>{`who writes it`}</th>
      <th>{`what it does`}</th>
    </tr>
  </thead>
  <tbody>
  @for(row : subscriberRows){
    <tr>
      <td><code>{row.name}</code></td>
      <td><code>{row.type}</code></td>
      <td>{row.who}</td>
      <td>{row.role}</td>
    </tr>
  }
  </tbody>
</table>
<p>{`Right after new Counter(), before any @Component wrapper exists, those maps look like this:`}</p>
<pre>{dummyMapsSample}</pre>
<p>{`@Computed() is a passthrough getter today -- no cache, no dependency list. computedSubscribers and addComputedSubscribers are reserved; wiring them is pending. Do not treat that map as live behavior.`}</p>

<h3>{`@State is two shapes`}</h3>
<p>{`The field decorator in state.decorator.ts always installs a getter/setter. What the getter returns depends on the initial value:`}</p>
<ul>
  <li>{`Primitive (number, string, boolean): Proxify.get returns the value as-is. The field is only an accessor. this.count++ hits the setter, which stores the number and calls runSubscribers().`}</li>
  <li>{`Object, array, Map, Set: Proxify.get recursively wraps the value in a Proxy whose set / deleteProperty traps call the same runSubscribers callback. Nested objects and arrays get their own Proxy. Nested primitives stay raw.`}</li>
</ul>
<pre>{dummyStateDecoratorSample}</pre>
<p>{`The setter does not re-run Proxify.get. Reassignment notifies, but a freshly assigned object is not automatically wrapped again. In-place mutation of the original Proxy still notifies.`}</p>
<div class="diagram-wrap">
  <img class="diagram" src="/diagrams/proxify-tree.svg" alt="Proxify recursively wrapping a user object and its tags array"/>
</div>
<p>{`Dummy writes, and which path they take:`}</p>
<ul>
  <li>{`this.count = 1 -- accessor setter only. No Proxy.`}</li>
  <li>{`this.user.name = 'Ada' -- Proxy set trap on the user object.`}</li>
  <li>{`this.user.tags.push('ui') -- Proxy set trap on the nested array.`}</li>
</ul>
<div class="diagram-wrap">
  <img class="diagram" src="/diagrams/state-change-flow.svg" alt="Primitive accessor or Proxy trap both call runSubscribers, then effects, then otherSubscriptions"/>
</div>

<h3>{`runSubscribers -- effects first, then other subscriptions`}</h3>
<p>{`@Effect(depFn) stores depFn -> method name in effectSubscribers via addInitializer. The method itself is unchanged. When state notifies:`}</p>
<pre>{dummyRunSubscribersSample}</pre>
<p>{`depFn is called with the instance. It must return an array. Each index is compared with !== against the previous array. Only changed slots invoke the effect, and the previous slot value is the argument (undefined on the first run). After every effect, otherSubscriptions run -- that is how DOM bindings attach. TaskQueue is imported in the state decorator but unused; notifies are synchronous. There is no per-field tracking: a write to count still re-runs an interpolation that only reads user.name.`}</p>
<p>{`An effect should write plain fields, not @State. It already runs inside an in-flight pass that will refresh every binding afterward. Writing @State from inside it re-enters that same pass.`}</p>
<div class="callout">
  <span class="callout-title">{`If you are changing this`}</span>
  <ul>
  @for(tip : stateChangeTips){
    <li>{tip}</li>
  }
  </ul>
</div>
}
@else-if(activeSection === 'compiler'){
<h2 id="compiler">{`Template compiler`}</h2>
<p>{`@beautiful-eyes/template-compiler is a webpack loader (packages/docs/webpack.config.js matches *.template.be). Every import of a .template.be file runs transform() once at build time: Lexer, Parser, Stringify visitor. The loader returns module.exports plus the emitted array. View never sees the source text -- only that array.`}</p>
<h3>{`Where the code lives`}</h3>
<table>
  <thead>
    <tr>
      <th>{`file`}</th>
      <th>{`what to read`}</th>
    </tr>
  </thead>
  <tbody>
  @for(row : compilerFiles){
    <tr>
      <td><code>{row.file}</code></td>
      <td>{row.body}</td>
    </tr>
  }
  </tbody>
</table>
<p>{`Walk the four tabs in order: the loader, how the lexer decides what a character means, how the parser buckets attributes and directives, then the emit shape Stringify produces.`}</p>
<CodeViewer $tabs={compilerSourceTabs} />
<div class="diagram-wrap">
  <img class="diagram" src="/diagrams/compile-pipeline.svg" alt="Compile pipeline from template.be through lexer, parser, stringify, to webpack module"/>
</div>
<div class="flow">
@for(index, step : compileSteps){
  <div class="flow-step">
    <h3>{step.title}</h3>
    <p>{step.body}</p>
  </div>
  @if(index < compileSteps.length - 1){
    <div class="flow-arrow">{'↓'}</div>
  }
}
</div>
<p>{`Bare identifiers inside interpolations and directive headers are rewritten to this.x, unless they are @for loop variables (see interpolationTranspiler.ts). String literals and backtick strings are left alone.`}</p>

<h3>{`Single element`}</h3>
<p>{`A template is always an array. One root tag is an array of length 1.`}</p>
<div class="two-col-pre">
  <div>
    <span class="pre-label">{`source`}</span>
    <pre>{singleElSource}</pre>
  </div>
  <div>
    <span class="pre-label">{`emitted (shape)`}</span>
    <pre>{singleElEmit}</pre>
  </div>
</div>
<p>{`class="box" is a StringNode -- set once, never registered as a binding. {count} is an Interpolation -- emitted as a function, later a Text node in reactiveElements.`}</p>

<h3>{`Multiple roots`}</h3>
<p>{`Sibling top-level tags stay siblings. bootstrap will append every entry of view.root.`}</p>
<div class="two-col-pre">
  <div>
    <span class="pre-label">{`source`}</span>
    <pre>{multiRootSource}</pre>
  </div>
  <div>
    <span class="pre-label">{`emitted (shape)`}</span>
    <pre>{multiRootEmit}</pre>
  </div>
</div>

<h3>{`Attributes vs event handlers`}</h3>
<p>{`name="literal" is a static DOM attribute. name={expr} is a function, re-evaluated on every notify. @name={expr} is stored on eventHandlers, not attributes -- evaluated once at mount, then addEventListener. $name={expr} is a component prop.`}</p>
<div class="two-col-pre">
  <div>
    <span class="pre-label">{`source`}</span>
    <pre>{eventSource}</pre>
  </div>
  <div>
    <span class="pre-label">{`emitted (shape)`}</span>
    <pre>{eventEmit}</pre>
  </div>
</div>
<p>{`addEventListeners does handler.call(component). If the result is a function (a method like inc, or an arrow), it is bound to the component and passed to addEventListener. The listener is not put in reactiveElements, so it is not re-bound when state changes. Dynamic class={...} is put in reactiveElements on the element.`}</p>
<div class="callout">
  <span class="callout-title">{`If you are changing this`}</span>
  <ul>
  @for(tip : compilerChangeTips){
    <li>{tip}</li>
  }
  </ul>
</div>
}
@else-if(activeSection === 'interpolation'){
<h2 id="interpolation">{`Interpolations, reactiveElements, otherSubscriptions`}</h2>
<p>{`This is the core of reactivity. A template expression is compiled into a function. View calls that function once to create a DOM node, stores a closure that calls it again, and ReactiveClass later runs every stored closure. There is no dependency list per interpolation -- the whole Map re-runs.`}</p>
<h3>{`Where the code lives`}</h3>
<table>
  <thead>
    <tr>
      <th>{`file`}</th>
      <th>{`what to read`}</th>
    </tr>
  </thead>
  <tbody>
  @for(row : interpolationFiles){
    <tr>
      <td><code>{row.file}</code></td>
      <td>{row.body}</td>
    </tr>
  }
  </tbody>
</table>

<h3>{`Compile: {count} becomes a function`}</h3>
<p>{`Lexer emits INTERPOLATION. Parser wraps the raw JS string in an Interpolation AST node. Stringify asks interpolationTranspiler to prefix bare identifiers with this, unless they are @for locals on the visitor scope stack, then emits a function. Attribute interpolations (class={mood}) take the same path; they land on attributes instead of children.`}</p>
<CodeViewer $tabs={interpolationExampleTabs} />
<p>{`The Map key is the live Text node. The value is a closure over that node, the compiled function, and any @for args captured at mount. fn.call(this) inside otherSubscriptions is slightly misleading -- the updater already closes over the component via interpolation.call(this.component), so the Map this is unused for interpolations. What matters is that the updater runs.`}</p>
<pre>{interpolationArgsSample}</pre>
<p>{`{count + 1} is the same path -- return this.count + 1. Dynamic attributes share the function shape but the updater lives on the Element, not a Text node: addAttributes collects function-valued keys, applies them once, then reactiveElements.set(el, update). Literal class="box" never enters the Map.`}</p>
<p>{`Whitespace between two interpolations is dropped entirely, not collapsed. {a} {b} renders with no space. Put the separator inside one interpolation: {a + ' ' + b}. Plain text after a closing brace must start with a letter -- glue punctuation into the interpolation instead.`}</p>

<h3>{`otherSubscriptions is the DOM walker`}</h3>
<p>{`ReactiveClass does not know about Text nodes. @Component init() is what connects them. The Parent below is the dummy for this section -- open the tabs for the template, the class, and the Map after mount:`}</p>
<CodeViewer $tabs={notifyTickTabs} />
<div class="diagram-wrap">
  <img class="diagram" src="/diagrams/reactivity-tick.svg" alt="Notify tick: runSubscribers then otherSubscriptions walking every reactiveElements updater"/>
</div>
<p>{`Walk parent.template.be once. this.count++ hits the accessor setter, which calls Parent.runSubscribers(). Effects run first. Then otherSubscriptions[0] iterates the Map in insertion order: the class updater re-reads mood, the Text updater re-reads count, the Badge-comment updater re-applies $label. A write to count still re-runs the mood updater. That is the whole contract -- cheap closures, no per-field graph.`}</p>
<p>{`Unmount is the inverse. unMountNode walks comments' nodeChild trees, then removeFromReactiveElements deletes each node from the Map so a destroyed {count} is not called on the next tick. @click never enters the Map: addEventListeners evaluates the handler once, binds it, and addEventListener -- it will not pick up a later replacement of inc.`}</p>
<div class="callout">
  <span class="callout-title">{`If you are changing this`}</span>
  <ul>
  @for(tip : interpolationChangeTips){
    <li>{tip}</li>
  }
  </ul>
</div>
}
@else-if(activeSection === 'component'){
<h2 id="component">{`@Component, template, reactiveElements, bootstrap`}</h2>
<p>{`@Component in core/src/component/component.decorator.ts subclasses the decorated class and adds the runtime shell. useTemplate is the compiled array from the loader. The rest of this section is one dummy -- Counter -- so every tab is the same button. Open @Component subclass for the actual wrapper class View and init live on.`}</p>
<h3>{`Where the code lives`}</h3>
<table>
  <thead>
    <tr>
      <th>{`file`}</th>
      <th>{`what to read`}</th>
    </tr>
  </thead>
  <tbody>
  @for(row : componentFiles){
    <tr>
      <td><code>{row.file}</code></td>
      <td>{row.body}</td>
    </tr>
  }
  </tbody>
</table>
<CodeViewer $tabs={counterExampleTabs} />
<p>{`Construction order matters. super() runs the user constructor and @State initializers first (accessor / Proxy). Then the subclass field view = new View(this) runs, which immediately calls buildNodeTree() on counter.template.be and fills reactiveElements. Then init() hooks that Map into otherSubscriptions. Only after that is the instance handed to bootstrap.`}</p>
<div class="diagram-wrap">
  <img class="diagram" src="/diagrams/bootstrap-mount.svg" alt="Construction order from new Counter through View bindings to bootstrap append"/>
</div>
<p>{`View.buildNodeTree walks the compiled array of counter.template.be. The string-less children of the button are one interpolation function, so that becomes a Text node plus a Map entry -- see the after mount tab. An HtmlObj whose name is in ComponentRegistry becomes a child component (comment anchor). Any other HtmlObj -- here, button -- becomes document.createElement, plus attributes, events, and a recursive walk of children. A directive becomes addIfElseDirective or addForDirective.`}</p>
<div class="flow-branch">
@for(kind : bindingKinds){
  <div class="flow-branch-item">
    <h3>{kind.title}</h3>
    <p>{kind.body}</p>
  </div>
}
</div>
<p>{`bootstrap does not build the tree -- View already did. It copies view.root (for Counter, that one button) into a DocumentFragment and appends it to the mount element. @if / @for / child-component bodies are spliced in on a queueMicrotask, after their comment anchors exist in the live DOM, because appendChildrenToParent only inserts after a Comment when that Comment already has a parentNode.`}</p>
<div class="callout">
  <span class="callout-title">{`If you are changing this`}</span>
  <ul>
  @for(tip : componentChangeTips){
    <li>{tip}</li>
  }
  </ul>
</div>
}
@else-if(activeSection === 'view'){
<h2 id="view">{`View class`}</h2>
<p>{`packages/core/src/View/view.class.ts is the runtime that turns a compiled template array into live DOM and bindings. @Component constructs it as a field initializer -- new View(this) -- so buildNodeTree runs after @State is installed and before init() hooks otherSubscriptions. bootstrap only appends the nodes View already made.`}</p>
<h3>{`Where the code lives`}</h3>
<table>
  <thead>
    <tr>
      <th>{`file`}</th>
      <th>{`what to read`}</th>
    </tr>
  </thead>
  <tbody>
  @for(row : viewFiles){
    <tr>
      <td><code>{row.file}</code></td>
      <td>{row.body}</td>
    </tr>
  }
  </tbody>
</table>
<p>{`One View instance belongs to one component instance. It holds a pointer to that component (for interpolation.call(component) and reactiveElements.set) and the root node array. It does not walk the parent, and it does not share a Map with child components -- a nested Badge has its own View.`}</p>
<div class="diagram-wrap">
  <img class="diagram" src="/diagrams/view-build-tree.svg" alt="buildNodeTree dispatch: string, interpolation, real element, child component, or if/for comment"/>
</div>
<p>{`Open the tabs in order: overview of the class, a dummy template walked to a node tree, then the three pieces of work View actually does -- build the tree, attach bindings, render directives.`}</p>
<CodeViewer $tabs={viewExampleTabs} />

<h3>{`How it builds the DOM tree`}</h3>
<p>{`constructor calls this.root = this.buildNodeTree() with no extra arguments. That walks component.template once, depth first. Each compiled slot is one of four JS types:`}</p>
<ul>
  <li>{`string -- document.createTextNode. Static copy like Hello next to an interpolation. No Map entry, never updated.`}</li>
  <li>{`function -- interpolation. Eval fn.call(component, ...args), wrap the result in a Text node, return that Text. Binding is attached in the next subsection.`}</li>
  <li>{`HTML_ELEMENT -- buildHtmlElement. ComponentRegistry.get(tagName) first: a hit means this tag is a child component, not a DOM element. A miss means createElement, wire events and attributes, recurse buildNodeTree on children, appendChild those kids into the element, return the element.`}</li>
  <li>{`DIRECTIVE -- buildDirectives. name ifElse or for. Those methods return a Comment, not the body nodes. The body is stamped and stored on comment.nodeChild, then inserted later.`}</li>
</ul>
<p>{`The dummy on the walkthrough tab is one div whose children hit every branch: a static string, an interpolation, an @if, an @for, and a Badge child. view.root is an array of length 1 -- that div. The comments and the Badge instance live under it. Nested recursion is the same function: the div's children array is another buildNodeTree call with the same args. Only @for changes args, by concatenating [index, item] before stamping a row.`}</p>
<p>{`append is not the same for elements and comments. An HTMLElement parent can appendChild immediately -- the kids are already in memory, they just need a parent. A Comment parent uses after(), which is a no-op until the comment has a parentNode. First paint of View usually happens while view.root is still detached, so if/for/component inserts are queued with queueMicrotask. bootstrap (or a parent append) puts the comment in the live tree, then the microtask splices the body after it.`}</p>

<h3>{`How it attaches bindings`}</h3>
<p>{`Bindings are Map entries on this.component.reactiveElements, not a list inside View. View only calls set() while it is building. init() later registers one otherSubscriptions walker that forEach those functions. Three node types get entries:`}</p>
<ul>
  <li>{`interpolation Text -- the updater is () => textNode.textContent = fn.call(component, ...args). First paint already happened when the Text was created, so the Map is for later ticks.`}</li>
  <li>{`element with at least one function-valued attribute -- addAttributes splits literals from functions. Literals are applied once (class="box"). Functions are collected, run immediately for first paint, then one updater on the element re-applies every dynamic key. One Map key per element, not per attribute.`}</li>
  <li>{`Comment -- @if stores paint, @for stores render, child component stores applyProps. The comment is the stable Map key because the body nodes come and go.`}</li>
</ul>
<p>{`Events are not bindings. addEventListeners evals the handler once, optionally bind(component, ...args), then addEventListener. There is no Map entry, so a later tick does not re-bind the click. If the handler expression itself depends on state, it is captured at first paint.`}</p>
<p>{`args is closed over by every updater created in that subtree. Top-level interpolations close over []. A @for row closes over [index, item] (or just [item]). Nested @for concatenates. That is how {item} inside a row still sees the right item after a tick -- the updater does not look the item up again from the array; it calls the same function with the same args it was stamped with. Reuse in @for therefore also requires the item reference and index to still match, otherwise the row is torn down and restamped with new args.`}</p>

<h3>{`How it renders directives and child components`}</h3>
<p>{`None of these have a host element. View plants a Comment, stamps the real nodes, hangs them on nodeChild, and returns only the comment to the parent. Inspecting the DOM you see <!--if--> / <!--for--> / <!--component:Badge-->; the framework sees the ownership list.`}</p>
<p>{`@if: addIfElseDirective creates <!--if-->, finds the first truthy branch (or -1), buildNodeTree that stamp, sets nodeChild, queues insert after the comment, and stores paint on the Map. paint on a later tick compares the winning index to lastIndex. Same index -- return, leave the branch DOM alone (inner interpolations still update via their own Map entries). Different index -- unMountNode every current child, stamp the new body, reset nodeChild, microtask-insert. No match and no @else -- nodeChild = [], comment stays as a hole.`}</p>
<p>{`@for: addForDirective creates <!--for--> and a keyed Map of live rows. render() evals the source, then for each entry either reuses the previous <!--for-item--> (same key and same item ref and same index) or unmounts the old row and stamps directive.body with [index, item]. Rows that disappeared are unMounted. anchor.nodeChild is the ordered list of for-item comments. The microtask walks flattenForDisplay of each row and splices that span after the previous node so a multi-node stamp (li plus nested if) moves as one unit.`}</p>
<p>{`Child component: buildComponent creates <!--component:Name-->, new Child() (which runs the child's own View + init), applyProps for $props and @handlers, stashes child.view.root on nodeChild, microtask-inserts those nodes after the comment, and stores an updater that only re-runs applyProps. The child's interpolations are already on the child's Map. The parent Map never walks them.`}</p>
<table>
  <thead>
    <tr>
      <th>{`piece`}</th>
      <th>{`what it does`}</th>
    </tr>
  </thead>
  <tbody>
  @for(row : viewMethodRows){
    <tr>
      <td><code>{row.name}</code></td>
      <td>{row.body}</td>
    </tr>
  }
  </tbody>
</table>
<p>{`Three details that surprise people in this file:`}</p>
<ul>
  <li>{`Structural directives and child components have no host element. View plants a Comment and hangs the real nodes off comment.nodeChild, a plain JS property (setCommentNodeProperty). Inspecting the DOM you see <!--if-->; the framework sees the list of nodes it owns.`}</li>
  <li>{`queueMicrotask before insert: buildNodeTree often runs while view.root is still detached. comment.after(node) is a no-op until the comment has a parentNode. The microtask runs after bootstrap (or a parent insert) has put the comment in the tree.`}</li>
  <li>{`args is how @for locals reach interpolations. Top-level buildNodeTree uses []. A row uses [index, item]. Nested @for concatenates. Every interpolation/attribute/event in that subtree is called as fn.call(component, ...args).`}</li>
</ul>
<p>{`unMountNode is the inverse of stamping. Comments recurse on nodeChild first, then the node is deleted from reactiveElements and removed from the DOM. That is shared by @if branch swaps, @for row deletes, and destroying a child component comment. appendChildrenToParent must advance its cursor past flattenForDisplay(child) when the child is a Comment -- otherwise the next sibling is inserted into the middle of the first directive's body.`}</p>
<div class="callout">
  <span class="callout-title">{`If you are changing this`}</span>
  <ul>
  @for(tip : viewChangeTips){
    <li>{tip}</li>
  }
  </ul>
</div>
}
@else-if(activeSection === 'children'){
<h2 id="children">{`How changes reach children`}</h2>
<p>{`Parent and child are two ReactiveClass instances. Each has its own effectSubscribers, otherSubscriptions, and reactiveElements. A parent this.count++ never walks the child's Map. The only hop across the boundary is a property write: parent.template.be says $label={name}, the child's View never sees name -- the parent's View assigns child.label on every parent tick.`}</p>
<h3>{`Where the code lives`}</h3>
<table>
  <thead>
    <tr>
      <th>{`file`}</th>
      <th>{`what to read`}</th>
    </tr>
  </thead>
  <tbody>
  @for(row : childrenFiles){
    <tr>
      <td><code>{row.file}</code></td>
      <td>{row.body}</td>
    </tr>
  }
  </tbody>
</table>
<CodeViewer $tabs={parentChildTabs} />
<div class="diagram-wrap">
  <img class="diagram" src="/diagrams/parent-child-props.svg" alt="Parent notify applies props onto the child Input setter, which may run the child tick"/>
</div>
<p>{`buildComponent looks up Badge in ComponentRegistry, constructs it (child View + init already ran, child's interpolations already bound to the child's Map), then applyProps copies $props and @handlers onto the instance. The parent stores one updater on the comment component:Badge:`}</p>
<pre>{applyPropsSample}</pre>
<p>{`$label={name} is a function evaluated with the parent as this, then assigned to child.label. @onPing={ping} is the same applyProps path -- not addEventListener. There is no host element for a component tag. The child receives a function on a plain field and calls this.onPing() itself, which mutates parent state, which ticks the parent, which applyProps again.`}</p>
<p>{`@Input is what turns that assignment into a child tick. It is an accessor like @State, with one extra guard:`}</p>
<pre>{inputSetterSample}</pre>
<p>{`Work a dummy parent.name = 'Bo' all the way down:`}</p>
<ul>
  <li>{`Parent accessor setter -> parent.runSubscribers().`}</li>
  <li>{`Parent otherSubscriptions walks parent.reactiveElements: the parent's {name} Text becomes Bo, then the comment updater runs applyProps.`}</li>
  <li>{`applyProps evaluates function(){ return this.name } on the parent, gets 'Bo', writes child.label = 'Bo'.`}</li>
  <li>{`Child @Input setter: old 'Ada' !== 'Bo', store 'Bo', child.runSubscribers().`}</li>
  <li>{`Child otherSubscriptions walks child.reactiveElements: the child's {label} Text becomes Bo.`}</li>
</ul>
<p>{`If the parent writes the same primitive, or re-applies the same object reference, the child setter returns early and the child Map is not walked. That is why a parent can tick (its own interpolations refresh) without every child ticking. It is also why mutating a nested field of an object passed as $user={user} will not refresh the child -- applyProps writes the same proxy, Input skips. Pass a primitive, or reassign the object, if the child must see the change.`}</p>
<p>{`Child-owned @State is the other direction. this.local++ on the child ticks only the child. The parent Map is untouched. Callbacks (@onPing) are how the child asks the parent to change parent state.`}</p>
<div class="callout">
  <span class="callout-title">{`If you are changing this`}</span>
  <ul>
  @for(tip : childrenChangeTips){
    <li>{tip}</li>
  }
  </ul>
</div>
}
@else-if(activeSection === 'ifelse'){
<h2 id="ifelse">{`@if / @else-if / @else -- compile, emit, runtime`}</h2>
<p>{`parseIfElse walks @if, then zero or more @else-if, then an optional @else. Each branch is [Interpolation, bodyNodes]. @else stores null instead of an interpolation -- it always matches if nothing above did. A lone @else-if or @else throws.`}</p>
<h3>{`Where the code lives`}</h3>
<table>
  <thead>
    <tr>
      <th>{`file`}</th>
      <th>{`what to read`}</th>
    </tr>
  </thead>
  <tbody>
  @for(row : ifelseFiles){
    <tr>
      <td><code>{row.file}</code></td>
      <td>{row.body}</td>
    </tr>
  }
  </tbody>
</table>
<p>{`The emitted children array is a list of branch stamps, not mounted DOM. Runtime evaluates the conditions in order and calls buildNodeTree on exactly one stamp -- or none, if every condition is false and there is no @else. The <!--if--> comment is the placeholder that stays in the parent; the winning body is inserted after it. Open parseIfElse for the parser walk, then emitted JS and runtime.`}</p>
<CodeViewer $tabs={ifExampleTabs} />
<div class="diagram-wrap">
  <img class="diagram" src="/diagrams/ifelse-emit.svg" alt="If-else source compiled to an array of condition and body pairs, then one mounted branch"/>
</div>
<p>{`First paint and later ticks share paint() (see the runtime tab). lastIndex remembers which branch is live:`}</p>
<ul>
  <li>{`Same winning index -- paint returns immediately. The branch DOM is not rebuilt. Interpolations inside that branch still update, because they registered their own reactiveElements entries on this same component when the branch was mounted.`}</li>
  <li>{`Different index -- unMountNode the current subtree (DOM remove + Map delete for every nested Text / attr / inner @if / @for), then buildNodeTree the new stamp, then insert the new nodes after <!--if-->. The old <span>even</span> is gone; a brand-new <span>odd</span> is created.`}</li>
  <li>{`No match and no @else -- unmount, nodes = [], lastIndex = -1. The comment remains; the parent has a hole until a condition becomes true again.`}</li>
</ul>
<p>{`Branches are created and destroyed, not shown and hidden with CSS. Open when count changes for a count=2 / 4 / 3 / 1 walkthrough.`}</p>
<h3>{`What the <!--if--> comment is for`}</h3>
<p>{`@if cannot return the <span> as the node that sits in the parent. The span is created and destroyed as count changes; the parent still needs a stable hole so the next sibling does not jump around, and paint() still needs a Map key that outlives any one branch. A Comment does that without adding an element that would break CSS -- there is no extra box, no extra tag.`}</p>
<CodeViewer $tabs={ifCommentTabs} />
<p>{`nodeChild on that comment is the ownership list: whatever is in it gets unMounted when the winning index changes. The comment itself stays. If the body is empty (no match, no @else), nodeChild is [] and the parent still contains <!--if--> -- a hole, not a missing node. Nested @if inside an @for row is the same idea at a smaller scale: each row's <!--if--> is that row's hole, stored in the row's for-item nodeChild.`}</p>
<p>{`The lexer reads @if(...) up to the first unmatched closing paren, with no nested-paren tracking -- prefer a comparison or a getter over an inline call with its own parentheses.`}</p>
<div class="callout">
  <span class="callout-title">{`If you are changing this`}</span>
  <ul>
  @for(tip : ifelseChangeTips){
    <li>{tip}</li>
  }
  </ul>
</div>
}
@else-if(activeSection === 'for'){
<h2 id="for">{`@for -- compile, emit, runtime`}</h2>
<p>{`Two headers: @for(item : source) or @for(index, item : source; key = trackById). The names before the colon are pushed onto the visitor scope stack, so interpolations inside the body become function(index, item){...} and those identifiers are not prefixed with this. Nested @for stacks: an inner loop still sees the outer item. After the colon is the collection expression. The optional key = trackById is a bare method name on the component, compiled as function(){ return this.trackById } -- the runtime later calls that method as trackById(item, indexOrKey).`}</p>
<h3>{`Where the code lives`}</h3>
<table>
  <thead>
    <tr>
      <th>{`file`}</th>
      <th>{`what to read`}</th>
    </tr>
  </thead>
  <tbody>
  @for(row : forFiles){
    <tr>
      <td><code>{row.file}</code></td>
      <td>{row.body}</td>
    </tr>
  }
  </tbody>
</table>
<p>{`body in the emitted JS is a stamp for one row, not the rendered list. The compiler does not know how long items will be. If the template has one <li>, body is an array of length 1 -- that <li> descriptor. At runtime, addForDirective calls buildNodeTree(body, [index, item]) once per array entry. Three items produce three separate <li> nodes, each with its own Text and its own reactiveElements entries.`}</p>
<CodeViewer $tabs={forExampleTabs} />
<p>{`First paint (see runtime and when the array changes):`}</p>
<ul>
  <li>{`Insert one <!--for--> comment in the parent. That comment is the Map key for the whole loop.`}</li>
  <li>{`source() is the current array. resolveForEntries turns it into [index, item] pairs (or Object.keys pairs for a plain object).`}</li>
  <li>{`For each pair, compute a key (trackById(item, index), or the index itself). Stamp body with buildNodeTree(body, [index, item]). Wrap those nodes in a <!--for-item--> comment. Store {comment, item, index} in a Map keyed by that key.`}</li>
  <li>{`A microtask walks the ordered for-item comments and after()-inserts each flattened row after <!--for-->, so DOM order matches the array.`}</li>
</ul>
<p>{`Every later tick re-runs the same render() against the current array. That is how a dynamic-length list grows and shrinks -- there is no separate "add row" API:`}</p>
<ul>
  <li>{`Key already in the Map, same item reference, same index -- reuse. The existing <li> and its interpolations stay. Those interpolations still refresh because they live in reactiveElements.`}</li>
  <li>{`New key (push, or a newly inserted object) -- stamp a new for-item with buildNodeTree. That is how more elements are added.`}</li>
  <li>{`Key gone (pop, filter, splice out) -- unMountNode that for-item. The <li> is removed from the DOM and its Text / inner directives are deleted from reactiveElements. That is how excess elements are deleted.`}</li>
  <li>{`Same key but item reference or index changed -- destroy the old row and stamp a new one. A splice that shifts later indexes remounts those rows even with key = trackById, because reuse requires index to match too.`}</li>
  <li>{`Duplicate key -- throw.`}</li>
</ul>
<p>{`Open when the array changes for a two-item list that is pushed, popped, spliced, and mutated in place. resolveForEntries: an array becomes [index, item] pairs; a plain object becomes Object.keys pairs; anything else throws.`}</p>
<h3>{`What <!--for--> and <!--for-item--> are for`}</h3>
<p>{`Two comment kinds, different jobs. <!--for--> is the list hole -- one per @for, same reasons as <!--if-->: a stable slot in the parent, the reactiveElements key for render(), and an insertion cursor. Its nodeChild is not the <li>s directly; it is the ordered list of <!--for-item--> comments so the whole list can be unmounted as one tree (for example when a parent @if destroys this block).`}</p>
<p>{`<!--for-item--> is the per-row handle. A row stamp can be several nodes -- an <li>, a nested <!--if-->, more text. Reuse, delete, and reorder need a single owner for that set. render() keeps keyedEntries: key -> that for-item comment. flattenForDisplay(for-item) walks nodeChild recursively so moving one row moves the comment plus the <li> plus nested holes as one block.`}</p>
<CodeViewer $tabs={forCommentTabs} />
<p>{`Without for-item, the runtime would have to treat the first stamped node as the key, and a multi-node stamp would leak siblings when the row was removed or reordered. unMountNode(for-item) is the delete path: recurse nodeChild, drop Map entries for nested interpolations and inner <!--if-->, then remove the comment.`}</p>
<div class="diagram-wrap">
  <img class="diagram" src="/diagrams/for-reconcile.svg" alt="For reconcile: source to key to reuse, rebuild, or unmount, then DOM order"/>
</div>
<p>{`Same header-scan limitation as @if: the source expression is read to the first unmatched ) or ;. Prefer filteredItems over items.filter(...) inline.`}</p>
<div class="callout">
  <span class="callout-title">{`If you are changing this`}</span>
  <ul>
  @for(tip : forChangeTips){
    <li>{tip}</li>
  }
  </ul>
</div>
}
@else-if(activeSection === 'lookup'){
<h2 id="lookup">{`Where to look`}</h2>
<p>{`Use this table when you already know the task. If you do not, start at Architecture -- it names the package -- then open that topic.`}</p>
<table>
  <thead>
    <tr>
      <th>{`task`}</th>
      <th>{`files`}</th>
    </tr>
  </thead>
  <tbody>
  @for(row : quickReference){
    <tr>
      <td>{row.task}</td>
      <td><code>{row.files}</code></td>
    </tr>
  }
  </tbody>
</table>

<div class="callout">
  <span class="callout-title">{`Gotchas worth knowing before you touch either pipeline`}</span>
  <ul>
    <li>{`@Effect / @Computed subscribers are per-instance, not static -- if you touch reactiveClass.ts, keep it that way. A shared/static map lets one instance's effect run against a different instance's this and crash.`}</li>
    <li>{`An @Effect method should write to plain fields, not @State -- it already runs inside an in-flight reactive pass that will refresh every binding afterward anyway. Writing to another @State field from inside it re-enters that same pass.`}</li>
    <li>{`appendChildrenToParent must advance its insertion cursor past a Comment-anchored child's entire expanded subtree, not just the anchor -- otherwise a second directive or component sibling at the same level gets spliced into the middle of the first one's content.`}</li>
    <li>{`The lexer only reads a run of text as plain text if it starts with a letter -- punctuation immediately after an interpolation's closing brace, or whitespace between two interpolations, needs a workaround (see Templates in the Docs side nav).`}</li>
    <li>{`@if(...) and @for(... : ...) headers are scanned to the first unmatched ) or ;, with no nested-parenthesis tracking -- avoid an inline call with its own parens inside a condition.`}</li>
    <li>{`@for reuses a row only when key, item reference, and index/key all match. A splice that shifts indexes remounts those rows even with key = trackById.`}</li>
    <li>{`@Input skips when the incoming value is === the current one. Nested mutation of an object passed as a $prop will not tick the child.`}</li>
    <li>{`document.createElement is used for every tag. Inline svg in a template.be file will not be SVG-namespaced -- that is why the diagrams on this page are static files under public/diagrams/.`}</li>
  </ul>
</div>
}
    </article>
  </div>
</div>

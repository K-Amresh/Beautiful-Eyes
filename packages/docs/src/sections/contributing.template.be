<h1>{`Contributing`}</h1>
<p class="lede">{`This page is for anyone about to touch the framework's own code -- not just use it. It walks a value from a class field through Proxy / accessors, through the compiled template, through View bindings, and into the DOM. Dummy examples match the real emit shape (NODE_OBJ_TYPE.HTML_ELEMENT is 0, DIRECTIVE is 1).`}</p>

<p class="toc-label">{`On this page`}</p>
<ul class="toc">
@for(item : toc){
  <li><a href={item.href}>{item.label}</a></li>
}
</ul>

<h2 id="structure">{`Project structure`}</h2>
<p>{`An npm-workspaces monorepo. Each package under packages/ has one job:`}</p>
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

<h2 id="state">{`ReactiveClass -- maps, @State, Proxy, runSubscribers`}</h2>
<p>{`Every stateful class extends ReactiveClass. There is no global store and no fine-grained dependency graph. A write on this instance runs every effect and every DOM binding registered on this instance. Other instances are untouched.`}</p>
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

<h2 id="compiler">{`Template compiler`}</h2>
<p>{`@beautiful-eyes/template-compiler is a webpack loader (packages/docs/webpack.config.js matches *.template.be). Every import of a .template.be file runs transform() once at build time: Lexer, Parser, Stringify visitor. The loader returns module.exports plus the emitted array.`}</p>
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

<h2 id="interpolation">{`Interpolations, reactiveElements, otherSubscriptions`}</h2>
<p>{`This is the core of reactivity. A template expression is compiled into a function. View calls that function once to create a DOM node, stores a closure that calls it again, and ReactiveClass later runs every stored closure. There is no dependency list per interpolation -- the whole Map re-runs.`}</p>

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

<h2 id="component">{`@Component, template, reactiveElements, bootstrap`}</h2>
<p>{`@Component in core/src/component/component.decorator.ts subclasses the decorated class and adds the runtime shell. useTemplate is the compiled array from the loader. The rest of this section is one dummy -- Counter -- so every tab is the same button:`}</p>
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

<h2 id="children">{`How changes reach children`}</h2>
<p>{`Parent and child are two ReactiveClass instances. Each has its own effectSubscribers, otherSubscriptions, and reactiveElements. A parent this.count++ never walks the child's Map. The only hop across the boundary is a property write: parent.template.be says $label={name}, the child's View never sees name -- the parent's View assigns child.label on every parent tick.`}</p>
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

<h2 id="ifelse">{`@if / @else-if / @else -- compile, emit, runtime`}</h2>
<p>{`parseIfElse walks @if, then zero or more @else-if, then an optional @else. Each branch is [Interpolation, bodyNodes]. @else stores null instead of an interpolation. A lone @else-if or @else throws.`}</p>
<CodeViewer $tabs={ifExampleTabs} />
<div class="diagram-wrap">
  <img class="diagram" src="/diagrams/ifelse-emit.svg" alt="If-else source compiled to an array of condition and body pairs, then one mounted branch"/>
</div>
<p>{`Runtime (addIfElseDirective): insert a comment if, evaluate conditions in order with interpolation.call(component), mount the first truthy body (null always wins). The comment is the reactiveElements key. On notify, if the winning index is unchanged, return. If it changed, unMountNode the current subtree (which also deletes nested Map entries) and mount the new body. Branches are created and destroyed, not shown and hidden. See the runtime tab above.`}</p>
<p>{`The lexer reads @if(...) up to the first unmatched closing paren, with no nested-paren tracking. Prefer a comparison or a getter over an inline call with its own parentheses.`}</p>

<h2 id="for">{`@for -- compile, emit, runtime`}</h2>
<p>{`Two headers: @for(item : source) or @for(index, item : source; key = trackById). The names before the colon are pushed onto the visitor scope stack, so interpolations inside the body become function(index, item){...} and those identifiers are not prefixed with this. Nested @for stacks: an inner loop still sees the outer item. After the colon is the collection expression. The optional key = trackById is a bare method name on the component, compiled as function(){ return this.trackById } -- the runtime later calls that method as trackById(item, indexOrKey).`}</p>
<CodeViewer $tabs={forExampleTabs} />
<p>{`resolveForEntries: an array becomes [index, item] pairs. A plain object becomes Object.keys pairs. Anything else throws. Each row is built as buildNodeTree(body, [...parentArgs, indexOrKey, item]) so nested interpolations receive the loop variables as arguments.`}</p>
<div class="diagram-wrap">
  <img class="diagram" src="/diagrams/for-reconcile.svg" alt="For reconcile: source to key to reuse, rebuild, or unmount, then DOM order"/>
</div>
<p>{`addForDirective keeps a Map from key to {comment, item, indexOrKey}. Duplicate keys throw. Reuse is stricter than a typical keyed list -- see the runtime tab above.`}</p>
<p>{`Each row owns a comment for-item whose nodeChild is that iteration's nodes. Unmount walks those comments, removes the DOM, and deletes their bindings. A microtask then walks the ordered comments and after()-inserts the flattened trees so DOM order matches the source, including nested directive comments.`}</p>
<p>{`Same header-scan limitation as @if: the source expression is read to the first unmatched ) or ;. Prefer filteredItems over items.filter(...) inline.`}</p>

<h2 id="lookup">{`Where to look`}</h2>
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
    <li>{`The lexer only reads a run of text as plain text if it starts with a letter -- punctuation immediately after an interpolation's closing brace, or whitespace between two interpolations, needs a workaround (see the Templates tab).`}</li>
    <li>{`@if(...) and @for(... : ...) headers are scanned to the first unmatched ) or ;, with no nested-parenthesis tracking -- avoid an inline call with its own parens inside a condition.`}</li>
    <li>{`@for reuses a row only when key, item reference, and index/key all match. A splice that shifts indexes remounts those rows even with key = trackById.`}</li>
    <li>{`@Input skips when the incoming value is === the current one. Nested mutation of an object passed as a $prop will not tick the child.`}</li>
    <li>{`document.createElement is used for every tag. Inline svg in a template.be file will not be SVG-namespaced -- that is why the diagrams on this page are static files under public/diagrams/.`}</li>
  </ul>
</div>

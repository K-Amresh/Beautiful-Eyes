<h1>{`Beautiful Eyes`}</h1>
<p class="lede">{`A small reactive UI framework: decorator-based state, a compact HTML-like template language, and a component system, compiled ahead of time into plain DOM code. This docs site is itself built with it.`}</p>

<h2>{`Three packages`}</h2>
<ul>
  <li>{`@beautiful-eyes/reactiveclass -- decorator-based reactive state: ReactiveClass, @State, @Effect, @Computed, @Input.`}</li>
  <li>{`@beautiful-eyes/template-compiler -- compiles .template.be files into a plain JS node tree.`}</li>
  <li>{`@beautiful-eyes/core -- turns that node tree into real DOM, wires up reactivity, and implements the component system (@Component, props, nesting).`}</li>
</ul>

<h2>{`A minimal example`}</h2>
<p>{`A component pairs a template file with a class:`}</p>
<pre>{templateSample}</pre>
<pre>{componentSample}</pre>
<p>{`bootstrap is only used for the root component. Any component referenced from inside a template (see the Components tab) is instantiated and mounted automatically -- no manual bootstrap call needed.`}</p>
<pre>{bootstrapSample}</pre>

<div class="callout">
  <span class="callout-title">{`Status`}</span>
  <p>{`This is a working prototype, not a finished product. Each tab ends with a short "known limitations" note -- read it before relying on a feature in anything real.`}</p>
</div>

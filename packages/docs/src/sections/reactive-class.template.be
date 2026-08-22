<h1>{`Reactive Class`}</h1>
<p class="lede">{`All stateful classes -- components or otherwise -- extend ReactiveClass. It tracks how many instances exist and holds a list of callbacks to run whenever this instance's state changes; the template runtime uses that to re-run every reactive DOM binding belonging to a component instance. There is no fine-grained dependency tracking: a state change re-evaluates all of that instance's bindings.`}</p>

<h2>{`@State()`}</h2>
<p>{`A field decorator for anything the template reads.`}</p>
<pre>{stateSample}</pre>
<ul>
  <li>{`Primitives (numbers, strings, booleans) get a plain getter/setter pair; assigning a new value triggers a re-render.`}</li>
  <li>{`Objects, arrays, Maps and Sets are wrapped in a Proxy (recursively, for nested structures), so in-place mutation also triggers a re-render.`}</li>
  <li>{`Reassigning the whole field works too, and re-proxies the new value.`}</li>
</ul>
<DemoCounter />

<h2>{`@Effect(dependencyFn)`}</h2>
<p>{`A method decorator that runs the method when values returned by dependencyFn(this) change. dependencyFn returns an array; the effect method is called once per array index whose value differs from the previous run, passed that index's previous value as the argument (undefined on the very first run).`}</p>
<pre>{effectSample}</pre>
<DemoEffectLog />

<h2>{`@Computed()`}</h2>
<p>{`A getter decorator.`}</p>
<pre>{computedSample}</pre>
<p>{`Currently @Computed() is a plain passthrough -- it does not cache the result or track dependencies yet. It is safe to use exactly like an undecorated getter; just do not expect memoization.`}</p>

<h2>{`@Input()`}</h2>
<p>{`A field decorator used on components, for values a parent passes in as a prop (see Children in the Docs side nav).`}</p>
<pre>{inputSample}</pre>
<p>{`It behaves like @State(), except the setter skips the re-render pass when the incoming value is identical to the current one -- a parent re-applies every prop on every one of its own re-renders, not just when that particular prop changed.`}</p>

<div class="callout">
  <span class="callout-title">{`Known limitations`}</span>
  <ul>
    <li>{`@Computed() does no caching or dependency tracking -- it re-runs on every access, same as a plain getter.`}</li>
    <li>{`An @Effect method should treat any state it writes as a plain field rather than @State (see the log field above) -- writing to an @State field from inside an effect re-enters the same reactive pass that is currently running it.`}</li>
    <li>{`There is no way to unsubscribe a binding independent of the DOM node being removed -- cleanup happens automatically when the owning @if / @for branch or component unmounts.`}</li>
  </ul>
</div>

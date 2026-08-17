<h1>{`Components`}</h1>
<p class="lede">{`A component is a ReactiveClass decorated with @Component, backed by a compiled .template.be file.`}</p>
<pre>{todoItemSample}</pre>

<h2>{`@Component(options)`}</h2>
<table>
  <thead>
    <tr>
      <th>{`option`}</th>
      <th>{`required`}</th>
      <th>{`meaning`}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>{`selector`}</code></td>
      <td>{`yes`}</td>
      <td>{`The tag name this component is used under in templates. Must be unique app-wide -- registering a second component under the same selector throws.`}</td>
    </tr>
    <tr>
      <td><code>{`useTemplate`}</code></td>
      <td>{`yes`}</td>
      <td>{`The default export of an imported .template.be file.`}</td>
    </tr>
    <tr>
      <td><code>{`useStyleSheets`}</code></td>
      <td>{`yes`}</td>
      <td>{`Currently unused by the runtime; reserved for future use. Pass an empty array.`}</td>
    </tr>
  </tbody>
</table>

<p>{`Decorating a class registers it globally as a side effect, at the moment its module is evaluated -- not when you construct it. If a component is only ever referenced from a template (never imported by name elsewhere), you still need a plain side-effect import somewhere before the app renders, so its module runs and the registration happens:`}</p>
<pre>{registrationSample}</pre>
<p>{`A conventional naming choice is PascalCase, matching plain HTML tags being lowercase -- but the actual resolution rule is just "is this tag name a registered selector", with no naming convention enforced by the compiler.`}</p>

<h2>{`Using a component from a template`}</h2>
<pre>{usageSample}</pre>
<ul>
  <li>{`$name={expr} binds a prop -- it is set onto the child instance's matching @Input() field, re-evaluated every time the parent re-renders. The child only actually re-renders itself if the incoming value changed.`}</li>
  <li>{`@name={expr} on a component tag is not a DOM event listener -- there is no real host element backing the tag. It is assigned onto the child instance as a plain field, the same mechanism as a prop. This is how you hand a callback down to a child; the child calls it itself, giving a lightweight substitute for an "output" event.`}</li>
  <li>{`Plain, unprefixed attributes have no effect on a component tag -- there is no host element to set them on.`}</li>
</ul>

<h2>{`Nesting`}</h2>
<p>{`Components nest arbitrarily deep, and typically appear inside a parent's @for loop to render a list:`}</p>
<pre>{nestingSample}</pre>
<p>{`Each component instance owns its own isolated set of reactive bindings -- a child re-rendering does not force its parent (or siblings) to re-render, and vice versa; the only thing crossing the boundary is the prop re-application described above.`}</p>

<div class="callout">
  <span class="callout-title">{`Known limitations`}</span>
  <ul>
    <li>{`No content projection / slots -- anything written between opening and closing component tags is parsed but silently ignored.`}</li>
    <li>{`No unmount / destroy lifecycle -- there is a destroyed() stub, but nothing calls it yet.`}</li>
    <li>{`#ref attributes are reserved syntax, not a working feature yet.`}</li>
    <li>{`Props and callbacks are the only parent-child / child-parent communication mechanism -- there is no shared or global store.`}</li>
  </ul>
</div>

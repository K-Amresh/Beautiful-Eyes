<h1>{`Templates`}</h1>
<p class="lede">{`.template.be files are compiled by the template-compiler webpack loader into a plain JS module -- an array describing the DOM tree. Every expression you write is evaluated with the owning component instance as this.`}</p>
<pre>{introSample}</pre>

<h2>{`Elements and text`}</h2>
<p>{`Standard HTML-like tags, paired or self-closing:`}</p>
<pre>{elementsSample}</pre>
<p>{`A tag whose name matches a registered @Component selector renders that component instead of a real DOM element.`}</p>

<h2>{`Interpolation`}</h2>
<p>{`expr is plain JavaScript, evaluated against the component instance:`}</p>
<pre>{interpolationSample}</pre>
<p>{`Bare identifiers are automatically rewritten to read from this -- write count, not this.count. (The one exception is @for loop variables.) String literals and backtick template strings are supported inside an interpolation.`}</p>

<h2>{`Attributes`}</h2>
<table>
  <thead>
    <tr>
      <th>{`syntax`}</th>
      <th>{`meaning`}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>{`name="literal"`}</code></td>
      <td>{`a plain string DOM attribute / property`}</td>
    </tr>
    <tr>
      <td><code>{`name={expr}`}</code></td>
      <td>{`a reactive DOM attribute / property, re-evaluated on every render`}</td>
    </tr>
    <tr>
      <td><code>{`@name={expr}`}</code></td>
      <td>{`a DOM event listener, on a plain element`}</td>
    </tr>
    <tr>
      <td><code>{`$name={expr}`}</code></td>
      <td>{`a prop, passed to a component's @Input() field -- components only`}</td>
    </tr>
    <tr>
      <td><code>{`#name`}</code></td>
      <td>{`reserved for element refs -- not functional yet`}</td>
    </tr>
  </tbody>
</table>
<p>{`Event handlers:`}</p>
<pre>{eventSample}</pre>
<p>{`{handleClick} is evaluated once (per render of the enclosing block) to get a function reference, then bound to the component instance and attached with addEventListener.`}</p>

<h2>{`@if / @else-if / @else`}</h2>
<pre>{ifSample}</pre>
<p>{`The condition is a plain expression, same rules as interpolation. Branches mount / unmount their whole subtree as the condition changes.`}</p>

<h2>{`@for`}</h2>
<p>{`Two forms:`}</p>
<pre>{forSample}</pre>
<ul>
  <li>{`The part before the colon declares one or two new loop variables (an item variable, optionally preceded by an index/key variable) -- these are in scope, unprefixed, everywhere inside the loop body, including nested @if / @for blocks and component props.`}</li>
  <li>{`The part after the colon is the collection expression -- an array (loop variables are index, item) or a plain object (loop variables are key, value).`}</li>
  <li>{`The optional "; key = trackFn" clause names a method on the component, called as trackFn(item, indexOrKey), used to compute a stable identity per entry so the DOM for unchanged entries is reused and just repositioned, instead of being torn down and rebuilt, when the list is reordered or spliced. Without it, the array index / object key is used as the identity.`}</li>
</ul>
<pre>{trackBySample}</pre>

<div class="callout">
  <span class="callout-title">{`Known limitations / formatting quirks`}</span>
  <ul>
    <li>{`Whitespace between two interpolations or tags is not preserved as a text node -- it is dropped entirely, not just collapsed. {a} {b} renders with no space between the two values; put a literal separator inside one interpolation instead, e.g. {a + ' ' + b}.`}</li>
    <li>{`Plain text immediately following an interpolation's closing brace must start with a letter -- punctuation glued directly onto an interpolation with no space fails to parse. Wrap the punctuation into the interpolation instead.`}</li>
    <li>{`@if(...) and @for(... : ...) expressions are read up to the first unmatched closing paren or semicolon, without tracking nested parentheses -- a condition with its own inner parentheses, such as a function call with arguments, can fail to parse. Prefer a parenthesis-free reference, like a plain comparison or a getter, over an inline call with nested parens.`}</li>
    <li>{`#ref attributes are parsed as reserved syntax but do not do anything yet.`}</li>
  </ul>
</div>

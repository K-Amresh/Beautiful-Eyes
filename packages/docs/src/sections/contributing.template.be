<h1>{`Contributing`}</h1>
<p class="lede">{`This page is for anyone about to touch the framework's own code -- not just use it. It covers the folder layout, how a .template.be file becomes DOM (compile time), and how a state change becomes a DOM update (run time), plus a short list of non-obvious gotchas worth knowing first.`}</p>

<h2>{`Project structure`}</h2>
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

<h2>{`Compile time -- the template pipeline`}</h2>
<p>{`@beautiful-eyes/template-compiler is a webpack loader. Every .template.be import goes through this pipeline once, at build time:`}</p>
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

<h2>{`Run time -- reactivity and subscriptions`}</h2>
<p>{`@beautiful-eyes/core owns everything after that: it walks the compiled module once to build real DOM (see View.buildNodeTree), and wires up what happens after a state change:`}</p>
<div class="flow">
@for(index, step : runtimeSteps){
  <div class="flow-step">
    <h3>{step.title}</h3>
    <p>{step.body}</p>
  </div>
  @if(index < runtimeSteps.length - 1){
    <div class="flow-arrow">{'↓'}</div>
  }
}
</div>
<div class="flow-branch">
@for(kind : bindingKinds){
  <div class="flow-branch-item">
    <h3>{kind.title}</h3>
    <p>{kind.body}</p>
  </div>
}
</div>
<p>{`There is no virtual DOM and no diff pass anywhere in this -- every binding above patches the real DOM directly. There is also no fine-grained dependency tracking: a state change re-runs all of that instance's bindings, not just the ones that actually read the changed field.`}</p>

<h2>{`Where to look`}</h2>
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
  </ul>
</div>

<h2>{`Sponsor`}</h2>
<p>{`Beautiful Eyes is a solo, spare-time project. If it saved you some time, or you just like the idea of a proxy-based, subscription-driven framework with no virtual DOM, a coffee is always appreciated -- it directly funds more time spent on things like the compiler bugs fixed while building this very docs site.`}</p>
<div class="sponsor-row">
  <div class="sponsor-qr">
    <img src="/upi.jpeg" alt="UPI payment QR code" />
    <span class="sponsor-caption">{`☕ Buy me a coffee -- scan to pay via UPI`}</span>
  </div>
</div>

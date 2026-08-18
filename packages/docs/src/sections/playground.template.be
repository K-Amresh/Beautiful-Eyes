<h1>{`Playground`}</h1>
<p class="lede">{`Open a fresh, editable CodeSandbox running the real framework -- @State, @Component, @for with keyed reconciliation, reactive attributes, event handlers, all of it. Not a simplified reimplementation: the sandbox bundles this repo's actual lib, reactiveClass, core and compiled template-compiler source.`}</p>

<form class="playground-form" method="POST" action="https://codesandbox.io/api/v1/sandboxes/define" target="_blank">
  <input type="hidden" name="parameters" value={parameters} />
  <button class="playground-open" type="submit">{`Open in CodeSandbox`}</button>
</form>

<h2>{`What's inside`}</h2>
<ul>
  <li>{`A counter and a small todo list, wired up with @State, @for (keyed), and reactive class/attribute bindings.`}</li>
  <li>{`The actual framework source, flattened into one project with relative imports -- no npm-published packages involved.`}</li>
  <li>{`Edit app.template.be or app.component.ts on the left; the dev server rebuilds and the preview reloads.`}</li>
</ul>
<pre>{appTemplateSample}</pre>

<div class="callout">
  <span class="callout-title">{`Heads up`}</span>
  <p>{`Each click creates a brand new, disposable sandbox -- nothing you do there affects this site or anyone else's copy. CodeSandbox's own build step (npm install, then webpack serve) takes a little while to boot the first time.`}</p>
</div>

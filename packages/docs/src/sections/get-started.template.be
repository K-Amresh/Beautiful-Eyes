<h1>{`Get started`}</h1>
<p class="lede">{`Use our create tool if you want a ready app, or set webpack up yourself. Both paths give you a TypeScript class, a .template.be file, and a compiled template in the DOM.`}</p>

<h2>{`Create a project -- our tool`}</h2>
<p>{`npx @beautiful-eyes/create copies a webpack starter, installs dependencies, and leaves a clickable counter. This is the path we recommend.`}</p>
<h3>{`Scaffold`}</h3>
<CopyCommand $command={createNpx} />
<h3>{`Or with npm`}</h3>
<CopyCommand $command={createNpm} />
<h3>{`Run`}</h3>
<p>{`Serves http://localhost:9000. Click increment -- the template shows count, the class runs this.count++.`}</p>
<CopyCommand $command={startApp} />
<p>{`You can skip Setup manually unless you want to wire an existing repo.`}</p>

<h2>{`Setup manually`}</h2>
<p>{`Use this if you already have a webpack project, or you do not want the scaffold.`}</p>

<h3>{`Install the runtime`}</h3>
<p>{`App code depends on @beautiful-eyes/core.`}</p>
<CopyCommand $command={installCore} />

<h3>{`Install build tools`}</h3>
<p>{`The compiler and the transformer are devDependencies -- they run at build time only.`}</p>
<CopyCommand $command={installDev} />

<h3>{`Webpack`}</h3>
<p>{`Two rules: compile .template.be, and run the TypeScript transformer so useTemplate paths become import() calls.`}</p>
<pre>{webpackSample}</pre>
<ul>
  <li>{`*.template.be goes through @beautiful-eyes/template-compiler/dist/index.js. Importing a template file gives you the compiled array.`}</li>
  <li>{`ts-loader runs @beautiful-eyes/dynamic-import so useTemplate and useStyleSheets string paths become import() calls.`}</li>
</ul>

<h3>{`TypeScript module declaration`}</h3>
<p>{`Without this, TypeScript rejects import template from './app.template.be'.`}</p>
<pre>{declareSample}</pre>

<h3>{`The first program`}</h3>
<p>{`A Counter. The class owns state. The template reads it and binds the click. index.html needs a div with id root -- bootstrap looks that element up; HtmlWebpackPlugin only injects the script tag.`}</p>
<CodeViewer $tabs={firstAppTabs} />
<ul>
  <li>{`@Component subclasses your class, stores the compiled template, constructs View, then hooks reactiveElements into otherSubscriptions.`}</li>
  <li>{`@State() count = 0 installs an accessor. this.count++ notifies this instance only.`}</li>
  <li>{`{count} compiles to function(){ return this.count }. View puts that on a Text node in the Map.`}</li>
  <li>{`@click={inc} is addEventListener once -- not a Map binding.`}</li>
</ul>

<h2>{`Where to go next`}</h2>
<p>{`Open the Docs tab and pick a topic in the side nav.`}</p>
<ul>
@for(step : nextSteps){
  <li><strong>{step.title}</strong>{` -- `}{step.body}</li>
}
</ul>
<p>{`Internals -- how View builds the tree, how @if / @for stamp comments -- are on the Contributing tab.`}</p>

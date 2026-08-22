<img class="hero" src="/Beautiful-eyes.jpg" alt="Beautiful Eyes" />

<h1>{`Beautiful Eyes`}</h1>
<p class="lede">{`A small reactive UI framework: decorator-based state, a compact HTML-like template language, and a component system, compiled ahead of time into plain DOM code. This docs site is itself built with it. Open Get Started to scaffold an app.`}</p>
<p class="overview-links">
  <a class="repo-link" href="https://github.com/AmKreta/Beautiful-Eyes" target="_blank" rel="noopener noreferrer">{`GitHub`}</a>
  <a class="repo-link" href="https://www.npmjs.com/org/beautiful-eyes" target="_blank" rel="noopener noreferrer">{`npm`}</a>
</p>

<div class="feature-grid">
@for(feature : features){
  <div class="feature-card">
    <h3>{feature.title}</h3>
    <p>{feature.body}</p>
  </div>
}
</div>

<h2>{`Packages on npm`}</h2>
<p>{`An app installs @beautiful-eyes/core. The others are the compiler, reactivity, and webpack helpers. All scoped packages live on the npm org page.`}</p>
<pre>{`npm install @beautiful-eyes/core`}</pre>
<table>
  <thead>
    <tr>
      <th>{`package`}</th>
      <th>{`what it is`}</th>
    </tr>
  </thead>
  <tbody>
  @for(pkg : npmPackages){
    <tr>
      <td><a href={pkg.href} target="_blank" rel="noopener noreferrer">{pkg.name}</a></td>
      <td>{pkg.body}</td>
    </tr>
  }
  </tbody>
</table>

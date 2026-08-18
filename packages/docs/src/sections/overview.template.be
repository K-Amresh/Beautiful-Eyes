<img class="hero" src="/Beautiful-eyes.jpg" alt="Beautiful Eyes" />

<h1>{`Beautiful Eyes`}</h1>
<p class="lede">{`A small reactive UI framework: decorator-based state, a compact HTML-like template language, and a component system, compiled ahead of time into plain DOM code. This docs site is itself built with it.`}</p>

<div class="feature-grid">
@for(feature : features){
  <div class="feature-card">
    <h3>{feature.title}</h3>
    <p>{feature.body}</p>
  </div>
}
</div>

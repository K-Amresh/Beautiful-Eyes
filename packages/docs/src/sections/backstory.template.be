<img class="hero" src="/Beautiful-eyes.jpg" alt="Beautiful Eyes" />

<h1>{`Backstory`}</h1>
<p class="lede">{lede}</p>

@for(chapter : chapters){
  <section class="story-chapter">
    <span class="story-year">{chapter.year}</span>
    <h2>{chapter.title}</h2>
    @for(paragraph : chapter.paragraphs){
      <p>{paragraph}</p>
    }
  </section>
}

<div class="callout story-close">
  <span class="callout-title">{closing.title}</span>
  @for(paragraph : closing.paragraphs){
    <p>{paragraph}</p>
  }
</div>

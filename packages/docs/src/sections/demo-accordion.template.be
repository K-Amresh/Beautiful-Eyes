<div class="demo-box">
  <span class="demo-label">{`live output -- click a question`}</span>
  <div class="demo-accordion">
  @for(faq : faqs; key = trackById){
    <div class="demo-faq">
      <button class="demo-faq-question" @click={() => toggle(faq.id)}>{faq.q}</button>
      @if(faq.open){
        <p class="demo-faq-answer">{faq.a}</p>
      }
    </div>
  }
  </div>
</div>

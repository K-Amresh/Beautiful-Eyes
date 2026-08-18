<div class="demo-box">
  <span class="demo-label">{`live output`}</span>
  <div class="demo-counter">
    <span class="demo-count">{count}</span>
    <button class="demo-btn" @click={increment}>{`bump count`}</button>
  </div>
  <ul class="demo-log">
  @for(entry : log){
    <li>{entry}</li>
  }
  </ul>
</div>

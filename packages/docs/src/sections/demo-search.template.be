<div class="demo-box">
  <span class="demo-label">{`live output -- type to filter`}</span>
  <input class="demo-input" type="text" placeholder="search..." @input={onInput} />
  <ul class="demo-list">
  @for(item : filtered){
    <li>{item}</li>
  }
  </ul>
  @if(filtered.length === 0){
    <p class="demo-empty">{`no matches`}</p>
  }
</div>

<div class="demo-box">
  <span class="demo-label">{`live output`}</span>
  <div class="demo-buttons">
    <button class={filter === 'all' ? 'demo-btn active' : 'demo-btn'} @click={() => setFilter('all')}>{`all`}</button>
    <button class={filter === 'active' ? 'demo-btn active' : 'demo-btn'} @click={() => setFilter('active')}>{`active`}</button>
    <button class={filter === 'done' ? 'demo-btn active' : 'demo-btn'} @click={() => setFilter('done')}>{`done`}</button>
    <button class="demo-btn" @click={add}>{`+ add`}</button>
  </div>
  <ul class="demo-todo-list">
  @for(item : filteredItems; key = trackById){
    <li class={item.done ? 'demo-todo done' : 'demo-todo'}>
      <span @click={() => toggle(item.id)}>{item.label}</span>
      <button class="demo-todo-remove" @click={() => remove(item.id)}>{'✕'}</button>
    </li>
  }
  </ul>
</div>

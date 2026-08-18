<div class="code-viewer">
  <div class="code-viewer-tabs">
  @for(tab : tabs){
    <button class={tab.key === activeKey ? 'code-tab active' : 'code-tab'} @click={() => selectTab(tab.key)}>{tab.label}</button>
  }
  </div>
  <pre class="code-viewer-body">{activeCode}</pre>
</div>

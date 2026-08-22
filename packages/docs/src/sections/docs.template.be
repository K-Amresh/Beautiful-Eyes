<div class={navOpen ? 'contrib-layout nav-open' : 'contrib-layout'}>
  <div class="contrib-scrim" @click={closeNav}></div>
  <aside class="contrib-nav">
    <div class="contrib-nav-head">
      <span class="contrib-nav-title">{`Docs`}</span>
      <button class="contrib-nav-close" @click={closeNav} aria-label="Close topics">{`Close`}</button>
    </div>
    @for(item : toc){
      @if(item.heading){
        <p class="toc-label">{item.heading}</p>
      }
      <button class={activeSection === item.key ? 'contrib-nav-item active' : 'contrib-nav-item'} @click={() => selectSection(item.key)}>{item.label}</button>
    }
  </aside>
  <div class="contrib-content">
    <div class="contrib-toolbar">
      <button class="contrib-menu-btn" @click={toggleNav} aria-label="Open topics">
        <span class="contrib-burger"></span>
        <span>{`Topics`}</span>
      </button>
    </div>
    <article class="contrib-article">
      @if(activeSection === 'reactive-class'){
        <ReactiveClassDocs />
      }
      @else-if(activeSection === 'components'){
        <ComponentsDocs />
      }
      @else-if(activeSection === 'children'){
        <ChildrenDocs />
      }
      @else-if(activeSection === 'templates'){
        <TemplatesDocs />
      }
      @else{
        <Examples />
      }
    </article>
  </div>
</div>

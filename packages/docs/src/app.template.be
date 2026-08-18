<header class="site-header">
  <div class="brand"><img class="brand-logo" src="/BE-Logo.png" alt="Beautiful Eyes" />Beautiful Eyes<span class="brand-dot">{'.'}</span></div>
  <button class="menu-toggle" @click={toggleMenu} aria-label="Toggle menu">{menuOpen ? '✕' : '☰'}</button>
  <nav class={menuOpen ? 'site-nav open' : 'site-nav'}>
  @for(tab : tabs){
    <button class={activeTab === tab.key ? 'nav-item active' : 'nav-item'} @click={() => setTab(tab.key)}>{tab.label}</button>
  }
  </nav>
</header>
<main class="site-main">
@if(activeTab === 'overview'){
  <Overview />
}
@else-if(activeTab === 'reactive-class'){
  <ReactiveClassDocs />
}
@else-if(activeTab === 'components'){
  <ComponentsDocs />
}
@else-if(activeTab === 'templates'){
  <TemplatesDocs />
}
@else-if(activeTab === 'examples'){
  <Examples />
}
@else-if(activeTab === 'playground'){
  <Playground />
}
@else-if(activeTab === 'contributing'){
  <Contributing />
}
@else{
  <Sponsor />
}
</main>
<footer class="site-footer">
  <span>{`Built with Beautiful Eyes -- the framework these docs describe.`}</span>
  <button class="footer-sponsor" @click={() => setTab('sponsor')}>{'☕ Sponsor'}</button>
</footer>

<header class="site-header">
  <div class="brand"><img class="brand-logo" src="/BE-Logo.png" alt="Beautiful Eyes" />Beautiful Eyes<span class="brand-dot">{'.'}</span></div>
  <nav class="site-nav">
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
@else-if(activeTab === 'playground'){
  <Playground />
}
@else{
  <Contributing />
}
</main>
<footer class="site-footer">{`Built with Beautiful Eyes -- the framework these docs describe.`}</footer>

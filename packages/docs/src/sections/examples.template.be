<h1>{`Examples`}</h1>
<p class="lede">{`Three small, complete examples -- each is a real, live component instance rendered on this page, not a screenshot. Code first (component / style / template), live output below it.`}</p>

@for(example : examples){
  <h2>{example.title}</h2>
  <p>{example.description}</p>
  <div class="example-grid">
    <div class="example-code">
      <CodeViewer $tabs={example.tabs} />
    </div>
    <div class="example-output">
      @if(example.id === 'todo'){
        <DemoTodoList />
      }
      @else-if(example.id === 'search'){
        <DemoSearch />
      }
      @else{
        <DemoAccordion />
      }
    </div>
  </div>
}

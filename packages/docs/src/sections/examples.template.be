<h1>{`Examples`}</h1>
<p class="lede">{`Three small, complete examples -- each is a real, live component instance rendered on this page, not a screenshot. Read the code, then play with the output right below it.`}</p>

<h2>{`Todo list -- @State, keyed @for, a derived getter`}</h2>
<p>{`Filtering by all / active / done reads from a getter, not a plain field -- it recomputes on every access, and since it is accessed as a bare property (filteredItems, no parens) it is safe to reference directly inside @for.`}</p>
<pre>{todoSample}</pre>
<pre>{todoTemplateSample}</pre>
<DemoTodoList />

<h2>{`Live search -- native DOM events, @if`}</h2>
<p>{`@name={expr} works for any native DOM event name, not just click -- here it listens for input to filter a list as you type.`}</p>
<pre>{searchSample}</pre>
<pre>{searchTemplateSample}</pre>
<DemoSearch />

<h2>{`Accordion -- nested @if inside @for`}</h2>
<p>{`Each item in the list carries its own open flag, and its own @if branch -- toggling one entry does not affect the others.`}</p>
<pre>{accordionSample}</pre>
<pre>{accordionTemplateSample}</pre>
<DemoAccordion />

import { Component, ReactiveClass } from '@beautiful-eyes/core';
import template from './examples.template.be';
import './code-viewer.component';
import './demo-todo-list.component';
import './demo-search.component';
import './demo-accordion.component';

// Adding a new example: append one entry here (id/title/description/tabs),
// then add one matching branch to the @if/@else-if chain in
// examples.template.be that renders <id>'s live demo tag. Everything else
// (layout, the tabbed code viewer) is shared and needs no changes.
@Component({
    selector: 'Examples',
    useTemplate: template,
    useStyleSheets: []
})
export class Examples extends ReactiveClass {
    todoComponentSample = `type Filter = 'all' | 'active' | 'done';

@Component({
    selector: 'TodoList',
    useTemplate: template,
    useStyleSheets: [style]
})
class TodoList extends ReactiveClass {
    @State() items = [
        { id: 1, label: 'Write docs', done: true },
        { id: 2, label: 'Fix reactivity bug', done: true },
        { id: 3, label: 'Ship the playground', done: false },
    ];
    @State() filter: Filter = 'all';

    // a getter, not a method call -- @for(item : filteredItems())
    // would fail to parse (see Contributing -> gotchas)
    get filteredItems(){
        if (this.filter === 'active') return this.items.filter(i => !i.done);
        if (this.filter === 'done') return this.items.filter(i => i.done);
        return this.items;
    }

    trackById(item: { id: number }){ return item.id; }
    setFilter(filter: Filter){ this.filter = filter; }

    toggle(id: number){
        const item = this.items.find(i => i.id === id);
        if (item) item.done = !item.done;
    }

    remove(id: number){
        this.items = this.items.filter(i => i.id !== id);
    }
}`;

    todoStyleSample = `.demo-todo-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.demo-todo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 8px 10px;
}

.demo-todo.done span {
    text-decoration: line-through;
    color: var(--text-dim);
}`;

    todoTemplateSample = `<div class="buttons">
  <button @click={() => setFilter('all')}>all</button>
  <button @click={() => setFilter('active')}>active</button>
  <button @click={() => setFilter('done')}>done</button>
</div>
<ul>
@for(item : filteredItems; key = trackById){
  <li class={item.done ? 'done' : ''}>
    <span @click={() => toggle(item.id)}>{item.label}</span>
    <button @click={() => remove(item.id)}>x</button>
  </li>
}
</ul>`;

    searchComponentSample = `@Component({
    selector: 'Search',
    useTemplate: template,
    useStyleSheets: [style]
})
class Search extends ReactiveClass {
    @State() query = '';
    items = ['Proxy', 'Subscription', 'Fine-grained updates', 'Decorators'];

    get filtered(){
        const q = this.query.trim().toLowerCase();
        if (!q) return this.items;
        return this.items.filter(i => i.toLowerCase().includes(q));
    }

    // @name={expr} on a plain element works for any native DOM event,
    // not just click -- here it is the input event
    onInput(e: Event){
        this.query = (e.target as HTMLInputElement).value;
    }
}`;

    searchStyleSample = `.demo-input {
    width: 100%;
    border: 1px solid var(--border);
    background: var(--bg);
    color: var(--text);
    padding: 8px 12px;
    border-radius: 6px;
}

.demo-empty {
    font-size: 13px;
    color: var(--text-dim);
    font-style: italic;
}`;

    searchTemplateSample = `<input type="text" @input={onInput} />
<ul>
@for(item : filtered){
  <li>{item}</li>
}
</ul>
@if(filtered.length === 0){
  <p>no matches</p>
}`;

    accordionComponentSample = `@Component({
    selector: 'Accordion',
    useTemplate: template,
    useStyleSheets: [style]
})
class Accordion extends ReactiveClass {
    @State() faqs = [
        { id: 1, q: 'Is there a virtual DOM?', a: '...', open: true },
        { id: 2, q: 'How does @State track mutations?', a: '...', open: false },
    ];

    trackById(faq: { id: number }){ return faq.id; }

    toggle(id: number){
        const faq = this.faqs.find(f => f.id === id);
        if (faq) faq.open = !faq.open;
    }
}`;

    accordionStyleSample = `.demo-faq {
    border: 1px solid var(--border);
    border-radius: 6px;
    overflow: hidden;
}

.demo-faq-question {
    width: 100%;
    text-align: left;
    background: var(--bg);
    border: none;
    padding: 10px 14px;
    cursor: pointer;
}

.demo-faq-answer {
    margin: 0;
    padding: 0 14px 12px;
}`;

    accordionTemplateSample = `@for(faq : faqs; key = trackById){
  <div class="faq">
    <button @click={() => toggle(faq.id)}>{faq.q}</button>
    @if(faq.open){
      <p>{faq.a}</p>
    }
  </div>
}`;

    examples = [
        {
            id: 'todo',
            title: 'Todo list -- @State, keyed @for, a derived getter',
            description: 'Filtering by all / active / done reads from a getter, not a plain field -- it recomputes on every access, and since it is accessed as a bare property (filteredItems, no parens) it is safe to reference directly inside @for.',
            tabs: [
                { key: 'component', label: 'component.ts', code: this.todoComponentSample },
                { key: 'style', label: 'style.css', code: this.todoStyleSample },
                { key: 'template', label: 'template.be', code: this.todoTemplateSample },
            ],
        },
        {
            id: 'search',
            title: 'Live search -- native DOM events, @if',
            description: '@name={expr} works for any native DOM event name, not just click -- here it listens for input to filter a list as you type.',
            tabs: [
                { key: 'component', label: 'component.ts', code: this.searchComponentSample },
                { key: 'style', label: 'style.css', code: this.searchStyleSample },
                { key: 'template', label: 'template.be', code: this.searchTemplateSample },
            ],
        },
        {
            id: 'accordion',
            title: 'Accordion -- nested @if inside @for',
            description: 'Each item in the list carries its own open flag, and its own @if branch -- toggling one entry does not affect the others.',
            tabs: [
                { key: 'component', label: 'component.ts', code: this.accordionComponentSample },
                { key: 'style', label: 'style.css', code: this.accordionStyleSample },
                { key: 'template', label: 'template.be', code: this.accordionTemplateSample },
            ],
        },
    ];
}

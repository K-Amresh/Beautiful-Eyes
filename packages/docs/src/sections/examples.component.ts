import { Component, ReactiveClass } from '@beautiful-eyes/core';
import template from './examples.template.be';
import './demo-todo-list.component';
import './demo-search.component';
import './demo-accordion.component';

@Component({
    selector: 'Examples',
    useTemplate: template,
    useStyleSheets: []
})
export class Examples extends ReactiveClass {
    todoSample = `type Filter = 'all' | 'active' | 'done';

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

    searchSample = `class Search extends ReactiveClass {
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

    searchTemplateSample = `<input type="text" @input={onInput} />
<ul>
@for(item : filtered){
  <li>{item}</li>
}
</ul>
@if(filtered.length === 0){
  <p>no matches</p>
}`;

    accordionSample = `class Accordion extends ReactiveClass {
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

    accordionTemplateSample = `@for(faq : faqs; key = trackById){
  <div class="faq">
    <button @click={() => toggle(faq.id)}>{faq.q}</button>
    @if(faq.open){
      <p>{faq.a}</p>
    }
  </div>
}`;
}

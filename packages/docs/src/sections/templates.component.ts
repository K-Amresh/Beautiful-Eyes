import { Component, ReactiveClass } from '@beautiful-eyes/core';
import template from './templates.template.be';

@Component({
    selector: 'TemplatesDocs',
    useTemplate: template,
    useStyleSheets: []
})
export class TemplatesDocs extends ReactiveClass {
    introSample = `<!-- todo-list.template.be -->
<h1>Todo list ({remaining} left)</h1>
<ul>
@for(item : items; key = trackById){
  <li>
    <TodoItem $label={item.label} $done={item.done} @onToggle={() => toggleItem(item.id)} />
  </li>
}
</ul>`;

    elementsSample = `<div>hello</div>
<input value="x" />`;

    interpolationSample = `<div>{count}</div>
<div>{count + 1}</div>
<div>{isDone ? 'done' : 'pending'}</div>`;

    eventSample = `<button @click={handleClick}>click me</button>
<button @click={() => this.count++}>+1</button>`;

    ifSample = `@if(count % 2 === 0){
  <span>even</span>
}
@else-if(count % 3 === 0){
  <span>divisible by 3</span>
}
@else{
  <span>odd</span>
}`;

    forSample = `@for(item : items){
  <li>{item}</li>
}

@for(index, item : items; key = trackById){
  <li>{index}: {item.label}</li>
}`;

    trackBySample = `class TodoList extends ReactiveClass {
    @State() items = [{ id: 1, label: 'Write docs' }];

    trackById(item: { id: number }){
        return item.id;
    }
}`;
}

import { Component, ReactiveClass } from '@beautiful-eyes/core';
import template from './playground.template.be';
import { PLAYGROUND_PARAMETERS } from './playground.parameters';

@Component({
    selector: 'Playground',
    useTemplate: template,
    useStyleSheets: []
})
export class Playground extends ReactiveClass {
    parameters = PLAYGROUND_PARAMETERS;

    appTemplateSample = `<div class="app">
  <h1>{...}</h1>

  <div class="counter">
    <button @click={decrement}>{'-'}</button>
    <span class="count">{count}</span>
    <button @click={increment}>{'+'}</button>
  </div>

  <ul class="todos">
  @for(index, todo : todos; key = trackById){
    <li class={todo.done ? 'todo done' : 'todo'}>
      <span @click={() => toggle(todo.id)}>{todo.label}</span>
    </li>
  }
  </ul>
</div>`;
}

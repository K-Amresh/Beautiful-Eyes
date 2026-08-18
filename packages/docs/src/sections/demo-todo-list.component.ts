import { Component, ReactiveClass, State } from '@beautiful-eyes/core';
import template from './demo-todo-list.template.be';

type Filter = 'all' | 'active' | 'done';

@Component({
    selector: 'DemoTodoList',
    useTemplate: template,
    useStyleSheets: []
})
export class DemoTodoList extends ReactiveClass {
    @State() items = [
        { id: 1, label: 'Write docs', done: true },
        { id: 2, label: 'Fix reactivity bug', done: true },
        { id: 3, label: 'Ship the playground', done: false },
    ];
    @State() filter: Filter = 'all';

    get filteredItems(){
        if(this.filter === 'active') return this.items.filter(i => !i.done);
        if(this.filter === 'done') return this.items.filter(i => i.done);
        return this.items;
    }

    trackById(item: { id: number }){
        return item.id;
    }

    setFilter(filter: Filter){
        this.filter = filter;
    }

    toggle(id: number){
        const item = this.items.find(i => i.id === id);
        if(item) item.done = !item.done;
    }

    remove(id: number){
        this.items = this.items.filter(i => i.id !== id);
    }

    add(){
        const id = this.items.length ? Math.max(...this.items.map(i => i.id)) + 1 : 1;
        this.items = [...this.items, { id, label: 'New task ' + id, done: false }];
    }
}

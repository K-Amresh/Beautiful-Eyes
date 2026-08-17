import { Component, ReactiveClass } from '@beautiful-eyes/core';
import template from './reactive-class.template.be';

@Component({
    selector: 'ReactiveClassDocs',
    useTemplate: template,
    useStyleSheets: []
})
export class ReactiveClassDocs extends ReactiveClass {
    stateSample = `class TodoList extends ReactiveClass {
    @State() items = [{ id: 1, label: 'Write docs', done: false }];
    @State() filter = 'all';
}

// mutating in place is enough to trigger a re-render:
list.items.push({ id: 2, label: 'Ship it', done: false });
list.items[0].done = true;`;

    effectSample = `class TodoList extends ReactiveClass {
    @State() items = [];

    @Effect((ctx: TodoList) => [ctx.items.length])
    onCountChange(previousLength: number | undefined){
        console.log('item count changed from', previousLength);
    }
}`;

    computedSample = `class TodoList extends ReactiveClass {
    @State() items = [];

    @Computed()
    get remaining(){
        return this.items.filter(i => !i.done).length;
    }
}`;

    inputSample = `class TodoItem extends ReactiveClass {
    @Input() label = '';
    @Input() done = false;
}`;
}

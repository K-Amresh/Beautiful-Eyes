import { Component, ReactiveClass } from '@beautiful-eyes/core';
import template from './reactive-class.template.be';
import './demo-counter.component';
import './demo-effect-log.component';

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

    effectSample = `class Counter extends ReactiveClass {
    @State() count = 0;

    // a plain field, not @State: this effect runs inside a reactive pass
    // that will already refresh every binding afterward, so a plain
    // mutation here is picked up for free
    log: string[] = [];

    @Effect((ctx: Counter) => [ctx.count])
    onCountChange(previous: number | undefined){
        const message = previous === undefined
            ? \`initial count is \${this.count}\`
            : \`count changed from \${previous} to \${this.count}\`;
        this.log = [message, ...this.log].slice(0, 4);
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

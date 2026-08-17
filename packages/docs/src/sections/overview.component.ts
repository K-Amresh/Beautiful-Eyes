import { Component, ReactiveClass } from '@beautiful-eyes/core';
import template from './overview.template.be';

@Component({
    selector: 'Overview',
    useTemplate: template,
    useStyleSheets: []
})
export class Overview extends ReactiveClass {
    templateSample = `// counter.template.be
<div>{count}</div>
<button @click={increment}>+1</button>`;

    componentSample = `// counter.component.ts
import { Component, ReactiveClass, State } from '@beautiful-eyes/core';
import template from './counter.template.be';

@Component({
    selector: 'Counter',
    useTemplate: template,
    useStyleSheets: []
})
class Counter extends ReactiveClass {
    @State() count = 0;

    increment(){
        this.count++;
    }
}`;

    bootstrapSample = `// app.ts
import { bootstrap } from '@beautiful-eyes/core';
import { Counter } from './counter.component';

const root = document.getElementById('root')!;
bootstrap(root, new Counter());`;
}

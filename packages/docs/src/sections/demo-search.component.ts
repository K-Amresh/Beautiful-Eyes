import { Component, ReactiveClass, State } from '@beautiful-eyes/core';
import template from './demo-search.template.be';

@Component({
    selector: 'DemoSearch',
    useTemplate: template,
    useStyleSheets: []
})
export class DemoSearch extends ReactiveClass {
    @State() query = '';

    items = ['Proxy', 'Subscription', 'Fine-grained updates', 'Decorators', 'Templates', 'Components', 'Reconciliation', 'Effects'];

    get filtered(){
        const q = this.query.trim().toLowerCase();
        if(!q) return this.items;
        return this.items.filter(i => i.toLowerCase().includes(q));
    }

    onInput(e: Event){
        this.query = (e.target as HTMLInputElement).value;
    }
}

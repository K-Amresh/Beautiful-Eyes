import { Component, ReactiveClass, State } from '@beautiful-eyes/core';
import template from './demo-accordion.template.be';

@Component({
    selector: 'DemoAccordion',
    useTemplate: template,
    useStyleSheets: []
})
export class DemoAccordion extends ReactiveClass {
    @State() faqs = [
        { id: 1, q: 'Is there a virtual DOM?', a: 'No -- each binding patches the real DOM directly.', open: true },
        { id: 2, q: 'How does @State track mutations?', a: 'Objects, arrays, Maps and Sets are wrapped in a Proxy; primitives use a plain accessor.', open: false },
        { id: 3, q: 'Can components nest?', a: 'Yes, arbitrarily deep, each with its own isolated set of bindings.', open: false },
    ];

    trackById(faq: { id: number }){
        return faq.id;
    }

    toggle(id: number){
        const faq = this.faqs.find(f => f.id === id);
        if(faq) faq.open = !faq.open;
    }
}

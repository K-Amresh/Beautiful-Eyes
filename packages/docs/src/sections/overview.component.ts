import { Component, ReactiveClass } from '@beautiful-eyes/core';
import template from './overview.template.be';

@Component({
    selector: 'Overview',
    useTemplate: template,
    useStyleSheets: []
})
export class Overview extends ReactiveClass {
    features = [
        {
            title: 'Proxy-based state',
            body: '@State wraps arrays, objects, Maps and Sets in a Proxy. Mutate in place -- push an item, flip a boolean two levels deep -- and the affected bindings still update, no immutable-update boilerplate.',
        },
        {
            title: 'Subscription-based updates',
            body: 'Every component instance keeps its own list of subscribers. A state change notifies exactly that instance\'s bindings -- not a global re-render, not the whole app.',
        },
        {
            title: 'Fine-grained DOM updates',
            body: 'There is no virtual DOM and no diffing pass. Each binding -- a text node, an attribute, an @if branch, a @for entry -- updates itself directly when it is notified.',
        },
        {
            title: 'Code style inspired by Angular',
            body: 'Decorators on plain TypeScript classes -- @Component, @State, @Effect, @Input -- instead of JSX or templates-as-functions. A component is a class with a separate template file.',
        },
        {
            title: 'Change detection inspired by Vue',
            body: 'Reactivity comes from Proxy interception on state you already read and write naturally, rather than compiler-injected signals (Svelte) or explicit signal primitives (Solid).',
        },
    ];
}

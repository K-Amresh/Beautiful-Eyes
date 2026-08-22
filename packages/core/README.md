# @beautiful-eyes/core

The [Beautiful Eyes](https://beautiful-eyes.netlify.app/) runtime: `@Component`, `View`, `bootstrap`, and re-exports of `@beautiful-eyes/reactiveclass` (`@State`, `@Effect`, `@Input`).

Turns a compiled `.template.be` array into real DOM and a `reactiveElements` Map. No virtual DOM.

```sh
npm install @beautiful-eyes/core
```

```ts
import { bootstrap, Component, ReactiveClass, State } from '@beautiful-eyes/core';
import template from './counter.template.be';

@Component({
  selector: 'Counter',
  useTemplate: template,
  useStyleSheets: []
})
class Counter extends ReactiveClass {
  @State() count = 0;
  inc() { this.count++; }
}

bootstrap(document.getElementById('root')!, new Counter());
```

Templates are compiled by [`@beautiful-eyes/template-compiler`](https://www.npmjs.com/package/@beautiful-eyes/template-compiler) (webpack loader). Wire that loader for `*.template.be` in your bundler.

- Docs: [beautiful-eyes.netlify.app](https://beautiful-eyes.netlify.app/)
- Source: [github.com/AmKreta/Beautiful-Eyes](https://github.com/AmKreta/Beautiful-Eyes/tree/master/packages/core)

# @beautiful-eyes/reactiveclass

Reactivity primitives for [Beautiful Eyes](https://beautiful-eyes.netlify.app/): `ReactiveClass`, `@State`, `@Effect`, `@Input`, and `@Computed` (passthrough today).

A write on one instance runs that instance's effects and DOM subscriptions. There is no global store.

```sh
npm install @beautiful-eyes/reactiveclass
```

```ts
import { ReactiveClass, State, Effect } from '@beautiful-eyes/reactiveclass';

class Counter extends ReactiveClass {
  @State() count = 0;

  @Effect((ctx: Counter) => [ctx.count])
  log(prev?: number) {
    console.log('was', prev, 'now', this.count);
  }
}
```

- `@State` -- accessor for primitives; objects / arrays / Maps / Sets are wrapped with `Proxify`
- `@Effect(depFn)` -- `depFn` must return an array; changed slots invoke the method
- `@Input` -- like `@State` with an `===` skip, used for parent `$props`

Most apps should import these from `@beautiful-eyes/core`, which re-exports this package.

- Docs: [beautiful-eyes.netlify.app](https://beautiful-eyes.netlify.app/)
- Source: [github.com/AmKreta/Beautiful-Eyes](https://github.com/AmKreta/Beautiful-Eyes/tree/master/packages/reactiveClass)

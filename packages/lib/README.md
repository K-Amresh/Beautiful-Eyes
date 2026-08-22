# @beautiful-eyes/lib

Shared utilities for [Beautiful Eyes](https://beautiful-eyes.netlify.app/): `Proxify` (recursive Proxy wrap for objects, arrays, Maps, and Sets), shared types, and a task-queue stub.

This package is used by `@beautiful-eyes/reactiveclass` and `@beautiful-eyes/core`. Install the framework from `@beautiful-eyes/core` unless you are extending the Proxy layer.

```sh
npm install @beautiful-eyes/lib
```

```ts
import { Proxify } from '@beautiful-eyes/lib';

const user = Proxify.get(
  { name: 'Ada', tags: ['core'] },
  'user',
  instance,
  null,
  () => instance.runSubscribers()
);
```

- Docs: [beautiful-eyes.netlify.app](https://beautiful-eyes.netlify.app/)
- Source: [github.com/AmKreta/Beautiful-Eyes](https://github.com/AmKreta/Beautiful-Eyes/tree/master/packages/lib)

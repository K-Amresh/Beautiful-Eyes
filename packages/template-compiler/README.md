# @beautiful-eyes/template-compiler

Webpack loader that compiles [Beautiful Eyes](https://beautiful-eyes.netlify.app/) `.template.be` files into a JS module: lexer → parser → AST → stringify visitor.

The emitted array is what `View` in `@beautiful-eyes/core` walks at runtime. The browser never sees the source text.

```sh
npm install @beautiful-eyes/template-compiler
```

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.template\.be$/,
        use: ['@beautiful-eyes/template-compiler/dist/index.js']
      }
    ]
  }
};
```

```ts
import template from './counter.template.be';
// template is [{ type: 0, name: 'button', children: [ function(){ return this.count } ], ... }]
```

Rebuild this package (`npm run build -w @beautiful-eyes/template-compiler`) after lexer or parser changes. The loader entry is `dist/index.js`.

- Docs: [beautiful-eyes.netlify.app](https://beautiful-eyes.netlify.app/) (Contributing tab)
- Source: [github.com/AmKreta/Beautiful-Eyes](https://github.com/AmKreta/Beautiful-Eyes/tree/master/packages/template-compiler)

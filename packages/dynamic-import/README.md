# @beautiful-eyes/dynamic-import

TypeScript transformer for [Beautiful Eyes](https://beautiful-eyes.netlify.app/). Rewrites `@Component` `useTemplate` and `useStyleSheets` string literals into `import()` calls so webpack can code-split templates and styles.

```sh
npm install @beautiful-eyes/dynamic-import
```

```js
// webpack.config.js
const { dynamicImport } = require('@beautiful-eyes/dynamic-import/dist/index');

{
  test: /\.(ts|tsx)$/,
  use: [{
    loader: 'ts-loader',
    options: {
      getCustomTransformers: (program) => ({
        before: [dynamicImport(program)]
      })
    }
  }]
}
```

```ts
@Component({
  selector: 'Counter',
  useTemplate: './counter.template.be',   // becomes import('./counter.template.be')
  useStyleSheets: ['./counter.scss']
})
```

- Docs: [beautiful-eyes.netlify.app](https://beautiful-eyes.netlify.app/)
- Source: [github.com/AmKreta/Beautiful-Eyes](https://github.com/AmKreta/Beautiful-Eyes/tree/master/packages/dynamic-import)

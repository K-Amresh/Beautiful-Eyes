<p align="center">
  <img src="packages/docs/public/Beautiful-eyes.jpg" alt="Beautiful Eyes" width="720">
</p>

<h1 align="center">Beautiful Eyes</h1>

<p align="center">
  A small reactive UI framework: decorator-based state, a compact HTML-like template language,<br>
  and a component system, compiled ahead of time into plain DOM code.
</p>

<p align="center">
  <a href="https://beautiful-eyes.netlify.app/"><img src="https://img.shields.io/badge/docs-live%20site-7c9dff?style=for-the-badge" alt="Documentation"></a>
  <a href="https://www.npmjs.com/package/@beautiful-eyes/core"><img src="https://img.shields.io/npm/v/@beautiful-eyes/core?style=for-the-badge" alt="npm @beautiful-eyes/core"></a>
  <a href="https://www.linkedin.com/feed/update/urn:li:ugcPost:7247125492263182336/"><img src="https://img.shields.io/badge/Watch%20on-LinkedIn-blue?style=for-the-badge&logo=linkedin" alt="Watch on LinkedIn"></a>
  <a href="https://www.linkedin.com/feed/update/urn:li:ugcPost:7245498239385247745/"><img src="https://img.shields.io/badge/Watch%20on-LinkedIn-blue?style=for-the-badge&logo=linkedin" alt="Watch on LinkedIn"></a>
</p>

---

## What is this?

- **Proxy-based state** -- `@State` wraps arrays, objects, Maps and Sets in a `Proxy`. Mutate in place and the affected bindings update, no immutable-update boilerplate.
- **Subscription-based updates** -- every component instance keeps its own list of subscribers. A state change notifies exactly that instance's bindings, not the whole app.
- **Fine-grained DOM updates** -- no virtual DOM, no diffing pass. Each binding (a text node, an attribute, an `@if` branch, a `@for` entry) updates itself directly when notified.
- **Code style inspired by Angular** -- decorators on plain TypeScript classes (`@Component`, `@State`, `@Effect`, `@Input`) instead of JSX or templates-as-functions.
- **Change detection inspired by Vue** -- reactivity through `Proxy` interception rather than compiler-injected signals (Svelte) or explicit signal primitives (Solid).

**📖 Full documentation, live examples, and an in-browser playground: [beautiful-eyes.netlify.app](https://beautiful-eyes.netlify.app/)**

## Quick start

```sh
npx @beautiful-eyes/create my-app
cd my-app
npm start
```

Same scaffold: `npm create @beautiful-eyes my-app`. Full walkthrough: **Get Started** on [beautiful-eyes.netlify.app](https://beautiful-eyes.netlify.app/).

To work on this repo:

```sh
git clone https://github.com/AmKreta/Beautiful-Eyes
cd Beautiful-Eyes
npm install
npm run start:qa      # a small example app
npm run start:docs    # the documentation site, built with the framework itself
```

See [`packages/qa/src`](packages/qa/src) for a minimal usage example.

An app typically installs [`@beautiful-eyes/core`](https://www.npmjs.com/package/@beautiful-eyes/core). All scoped packages: [npmjs.com/org/beautiful-eyes](https://www.npmjs.com/org/beautiful-eyes).

## Project structure

This is an npm-workspaces monorepo. Each package under `packages/` has one job:

| package | npm | what it does |
|---|---|---|
| [`core`](packages/core) | [`@beautiful-eyes/core`](https://www.npmjs.com/package/@beautiful-eyes/core) | Turns a compiled template into real DOM, wires up reactivity, and implements the component system (`@Component`, props, nesting, `bootstrap()`). |
| [`reactiveClass`](packages/reactiveClass) | [`@beautiful-eyes/reactiveclass`](https://www.npmjs.com/package/@beautiful-eyes/reactiveclass) | The reactivity primitives: `ReactiveClass`, `@State`, `@Effect`, `@Computed`, `@Input`. |
| [`template-compiler`](packages/template-compiler) | [`@beautiful-eyes/template-compiler`](https://www.npmjs.com/package/@beautiful-eyes/template-compiler) | Webpack loader that compiles `.template.be` files (lexer → parser → AST → visitor) into a plain JS module. |
| [`lib`](packages/lib) | [`@beautiful-eyes/lib`](https://www.npmjs.com/package/@beautiful-eyes/lib) | Shared utilities used across packages -- the `Proxy` machinery, shared types, a task queue. |
| [`dynamic-import`](packages/dynamic-import) | [`@beautiful-eyes/dynamic-import`](https://www.npmjs.com/package/@beautiful-eyes/dynamic-import) | A TypeScript transformer that rewrites static imports (`import './x'`) into dynamic ones (`import('./x')`). |
| [`create`](packages/create) | [`@beautiful-eyes/create`](https://www.npmjs.com/package/@beautiful-eyes/create) | `npx @beautiful-eyes/create my-app` -- webpack, TypeScript, and a first counter. |
| [`qa`](packages/qa) | — | A small example app used to exercise the framework end-to-end. |
| [`docs`](packages/docs) | — | The documentation site -- itself a Beautiful Eyes app. Deployed via the `netlify.toml` at the repo root. |

## Contributing

🚧 **Work in progress** 🚧 -- issues and pull requests are welcome.

Before diving in, read the **[Contributing guide](https://beautiful-eyes.netlify.app/)** (Contributing tab) in the docs site -- it walks through the project's folder structure, the compile-time template pipeline (lexer/parser/AST/visitors), and the runtime reactivity model (state → subscribers → DOM), with diagrams, plus a list of non-obvious gotchas worth knowing before you touch either.

## Sponsor

Beautiful Eyes is a solo, spare-time project. If it saved you some time, a coffee is always appreciated -- it directly funds more time spent on it.

<p align="center">
  <img src="packages/docs/public/upi.jpeg" alt="UPI payment QR code" width="180"><br>
  <sub>☕ Buy me a coffee -- scan to pay via UPI</sub>
</p>

## Inspiration

This framework is inspired by:
- **Vue.js** -- state handling strategy using Proxies
- **Svelte.js** -- architecture that ditches the virtual DOM
- **Solid.js** -- fine-grained component updates for better performance

---

<p align="center">🚀 Stay tuned for updates!</p>

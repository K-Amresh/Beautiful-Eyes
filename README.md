# Some Progress

## Embedded Videos  

### Video 1  
[![Watch on LinkedIn](https://img.shields.io/badge/Watch%20on-LinkedIn-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/feed/update/urn:li:ugcPost:7247125492263182336/)

### Video 2  
[![Watch on LinkedIn](https://img.shields.io/badge/Watch%20on-LinkedIn-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/feed/update/urn:li:ugcPost:7245498239385247745/)

---

## How to Set Up?  

1. Clone the project:
   ```sh
   git clone <your-repo-url>
   cd <your-project-directory>
   ```
2. Navigate to the QA package:
   ```sh
   cd packages/qa
   ```
3. Start the project:
   ```sh
   npm start
   ```

---

## Packages  

### `template-compiler`  
A Webpack plugin that parses template files and converts them into JavaScript objects during build time.  

### `dynamic-import`  
A TypeScript plugin that converts static imports into dynamic imports.  
Example:  
```ts
import './someFile';
```
will be transformed into  
```ts
import('./someFile');
```

### `reactiveClass`  
A class-based reactive system using `Proxy` and `Object.defineProperty`, allowing you to execute code when a property changes.  

### `core`  
Provides essential decorators and utilities, including:  
- `@Component`  
- `@State`  
- `@Effect`  
- `@Computed`  
- Functions like `bootstrap()`  

### `lib`  
A collection of utility libraries.  

### `qa`  
A package to test your framework.  

---

## Contribution  

🚧 **Work is still in progress** 🚧  
Feel free to open a **Pull Request** if you want to contribute!  

---

## Inspiration  

This framework is inspired by:  
- **Vue.js** - State handling strategy using Proxies  
- **Svelte.js** - Architecture that ditches the Virtual DOM  
- **Solid.js** - Fine-grained component updates for better performance  

---

🚀 **Stay tuned for updates!**


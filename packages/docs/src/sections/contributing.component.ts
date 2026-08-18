import { Component, ReactiveClass } from '@beautiful-eyes/core';
import template from './contributing.template.be';

@Component({
    selector: 'Contributing',
    useTemplate: template,
    useStyleSheets: []
})
export class Contributing extends ReactiveClass {
    // TODO: replace with the real Buy Me a Coffee URL
    bmcUrl = 'https://www.buymeacoffee.com/';

    packages = [
        { name: 'template-compiler', body: 'Webpack loader that compiles .template.be files (lexer -> parser -> AST -> visitor) into a plain JS module.' },
        { name: 'reactiveClass', body: 'The reactivity primitives -- ReactiveClass, @State, @Effect, @Computed, @Input.' },
        { name: 'core', body: 'Turns a compiled template into real DOM, wires up reactivity, implements the component system.' },
        { name: 'lib', body: 'Shared utilities -- the Proxy machinery, shared types, a task queue.' },
        { name: 'dynamic-import', body: 'A TypeScript transformer: rewrites static imports into dynamic ones.' },
        { name: 'qa', body: 'A small example app used to exercise the framework end-to-end.' },
        { name: 'docs', body: 'This site -- itself a Beautiful Eyes app.' },
    ];

    compileSteps = [
        { title: '.template.be source', body: 'Raw text: tags, {interpolations}, @if / @for, and $prop / @event / #ref attributes.' },
        { title: 'Lexer (lexer.ts)', body: 'Turns raw text into a token stream: TAG_OPEN, ATTRIBUTE_NAME, INTERPOLATION, IF, FOR, CURLEY_BRACKET_OPEN, and so on. Context-sensitive: what a character means depends on the previous token.' },
        { title: 'Parser (parser.ts)', body: 'Consumes the token stream, builds an AST: HtmlElement, Interpolation, StringNode, IfElse, For, HtmlAttribute, Ref.' },
        { title: 'Stringify visitor (visitors/stringify)', body: 'Walks the AST, emits a plain JS module -- an array of HtmlObj / DirectiveObj object literals and inline functions.' },
        { title: 'webpack', body: 'Treats that emitted JS as the loader\'s output. Importing a .template.be file gets you this compiled module as its default export.' },
    ];

    runtimeSteps = [
        { title: 'Component code writes state', body: 'this.count++ or this.items.push(x) -- ordinary-looking assignment or in-place mutation.' },
        { title: 'A Proxy trap fires', body: 'Objects, arrays, Maps and Sets are Proxy-wrapped; the set / deleteProperty trap catches the mutation. Primitives use a plain accessor instead of a Proxy.' },
        { title: 'runSubscribers() runs -- on that instance only', body: 'The trap\'s callback calls runSubscribers() on the ReactiveClass instance that owns the field. Every other instance in the app is untouched.' },
        { title: 'Every binding registered for this instance re-runs', body: 'reactiveElements holds one callback per binding, fanning out to whichever kinds are actually present:' },
    ];

    bindingKinds = [
        { title: 'Text interpolation', body: 'textNode.textContent = interpolation.call(component)' },
        { title: 'Dynamic attribute', body: 'Re-applies every function-valued attribute on that element.' },
        { title: '@if / @else', body: 'Re-checks the condition; swaps the mounted branch if it changed.' },
        { title: '@for', body: 'Diffs by key -- reuses unchanged entries, reorders or rebuilds the rest.' },
        { title: 'Component props', body: 'Re-applies $props onto the child instance\'s @Input fields.' },
    ];

    quickReference = [
        { task: 'Add a new attribute prefix (like $ or @)', files: 'lexer.ts (readAttributeName), parser.ts (parseAttribute)' },
        { task: 'Add a new structural directive', files: 'token.enum.ts, lexer.ts, parser.ts, a new AST node, Visitor + both visitors, view.class.ts' },
        { task: 'Change how @State reactivity works', files: 'reactiveClass.ts, state.decorator.ts, lib/src/Proxy/proxify' },
        { task: 'Change how components mount or receive props', files: 'view.class.ts (buildComponent), component.decorator.ts, componentRegistry.ts' },
        { task: 'Change how @for reconciles a list', files: 'view.class.ts (addForDirective, flattenForDisplay)' },
    ];
}

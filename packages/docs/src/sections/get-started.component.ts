import { Component, ReactiveClass } from '@beautiful-eyes/core';
import template from './get-started.template.be';
import './copy-command.component';

@Component({
    selector: 'GetStarted',
    useTemplate: template,
    useStyleSheets: []
})
export class GetStarted extends ReactiveClass {
    createNpx = `npx @beautiful-eyes/create my-app`;
    createNpm = `npm create @beautiful-eyes my-app`;
    startApp = `cd my-app && npm start`;
    installCore = `npm install @beautiful-eyes/core`;
    installDev = `npm install -D @beautiful-eyes/template-compiler @beautiful-eyes/dynamic-import typescript ts-loader webpack webpack-cli webpack-dev-server html-webpack-plugin css-loader style-loader`;

    firstAppTs = `import { bootstrap, Component, ReactiveClass, State } from '@beautiful-eyes/core';
import template from './app.template.be';
import './app.styles.css';

@Component({
    selector: 'App',
    useTemplate: template,
    useStyleSheets: []
})
class App extends ReactiveClass {
    @State() count = 0;

    inc(){
        this.count++;
    }
}

bootstrap(document.getElementById('root')!, new App());`;

    firstAppTemplate = `<div class="card">
  <h1>{{\`Beautiful Eyes\`}}</h1>
  <p>{{\`count is \`}}{count}</p>
  <button @click={inc}>{{\`increment\`}}</button>
</div>`;

    firstAppTabs = [
        { key: 'ts', label: 'src/app.ts', code: this.firstAppTs },
        { key: 'be', label: 'src/app.template.be', code: this.firstAppTemplate },
    ];

    webpackSample = `const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { dynamicImport } = require('@beautiful-eyes/dynamic-import/dist/index');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'app.ts'),
    plugins: [
        new HtmlWebpackPlugin({ template: './app/index.html' })
    ],
    module: {
        rules: [
            {
                test: /\\.template\\.be$/,
                use: ['@beautiful-eyes/template-compiler/dist/index.js']
            },
            {
                test: /\\.ts$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        getCustomTransformers: (program) => ({
                            before: [dynamicImport(program)]
                        })
                    }
                }]
            }
        ]
    },
    resolve: { extensions: ['.js', '.ts'] }
};`;

    declareSample = `declare module '*.template.be';`;

    nextSteps = [
        { title: 'Templates', body: 'Interpolations, @if / @else, @for, events, and $props.' },
        { title: 'Reactive Class', body: '@State, Proxy mutation, and @Effect.' },
        { title: 'Components', body: '@Component options, registration, and using a tag from a template.' },
        { title: 'Children', body: '@Input, the component comment, and how a child is stored in the parent.' },
        { title: 'Examples', body: 'Live counters, lists, and accordions built with the framework.' },
    ];
}

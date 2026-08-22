"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStarted = void 0;
const core_1 = require("@beautiful-eyes/core");
const get_started_template_be_1 = __importDefault(require("./get-started.template.be"));
require("./copy-command.component");
let GetStarted = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'GetStarted',
            useTemplate: get_started_template_be_1.default,
            useStyleSheets: []
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = core_1.ReactiveClass;
    var GetStarted = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.createNpx = `npx @beautiful-eyes/create my-app`;
            this.createNpm = `npm create @beautiful-eyes my-app`;
            this.startApp = `cd my-app && npm start`;
            this.installCore = `npm install @beautiful-eyes/core`;
            this.installDev = `npm install -D @beautiful-eyes/template-compiler @beautiful-eyes/dynamic-import typescript ts-loader webpack webpack-cli webpack-dev-server html-webpack-plugin css-loader style-loader`;
            this.firstAppTs = `import { bootstrap, Component, ReactiveClass, State } from '@beautiful-eyes/core';
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
            this.firstAppTemplate = `<div class="card">
  <h1>{{\`Beautiful Eyes\`}}</h1>
  <p>{{\`count is \`}}{count}</p>
  <button @click={inc}>{{\`increment\`}}</button>
</div>`;
            this.firstAppTabs = [
                { key: 'ts', label: 'src/app.ts', code: this.firstAppTs },
                { key: 'be', label: 'src/app.template.be', code: this.firstAppTemplate },
            ];
            this.webpackSample = `const path = require('path');
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
            this.declareSample = `declare module '*.template.be';`;
            this.nextSteps = [
                { title: 'Templates', body: 'Interpolations, @if / @else, @for, events, and $props.' },
                { title: 'Reactive Class', body: '@State, Proxy mutation, and @Effect.' },
                { title: 'Components', body: 'Nesting, @Input, and parent-to-child props.' },
                { title: 'Examples', body: 'Live counters, lists, and accordions built with the framework.' },
            ];
        }
    };
    __setFunctionName(_classThis, "GetStarted");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GetStarted = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GetStarted = _classThis;
})();
exports.GetStarted = GetStarted;

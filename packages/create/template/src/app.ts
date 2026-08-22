import { bootstrap, Component, ReactiveClass, State } from '@beautiful-eyes/core';
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

const root = document.getElementById('root')!;
bootstrap(root, new App());

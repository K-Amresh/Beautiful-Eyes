import { Component, ReactiveClass, State } from '@beautiful-eyes/core';
import template from './docs.template.be';
import './reactive-class.component';
import './components.component';
import './templates.component';
import './examples.component';

@Component({
    selector: 'Docs',
    useTemplate: template,
    useStyleSheets: []
})
export class Docs extends ReactiveClass {
    @State() activeSection = 'reactive-class';
    @State() navOpen = false;

    toc = [
        { key: 'reactive-class', label: 'Reactive Class', heading: 'Language' },
        { key: 'components', label: 'Components', heading: '' },
        { key: 'templates', label: 'Templates', heading: '' },
        { key: 'examples', label: 'Examples', heading: 'Practice' },
    ];

    selectSection(key: string){
        this.activeSection = key;
        this.navOpen = false;
        queueMicrotask(() => {
            const pane = document.querySelector('.contrib-content');
            if(pane) pane.scrollTop = 0;
        });
    }

    toggleNav(){
        this.navOpen = !this.navOpen;
    }

    closeNav(){
        this.navOpen = false;
    }
}

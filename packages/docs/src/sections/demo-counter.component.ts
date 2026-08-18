import { Component, ReactiveClass, State } from '@beautiful-eyes/core';
import template from './demo-counter.template.be';

@Component({
    selector: 'DemoCounter',
    useTemplate: template,
    useStyleSheets: []
})
export class DemoCounter extends ReactiveClass {
    @State() count = 0;

    increment(){
        this.count++;
    }

    decrement(){
        this.count--;
    }
}

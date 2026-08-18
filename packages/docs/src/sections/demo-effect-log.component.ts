import { Component, ReactiveClass, State, Effect } from '@beautiful-eyes/core';
import template from './demo-effect-log.template.be';

@Component({
    selector: 'DemoEffectLog',
    useTemplate: template,
    useStyleSheets: []
})
export class DemoEffectLog extends ReactiveClass {
    @State() count = 0;

    // plain field, not @State: this effect runs inside a reactive pass
    // that will already refresh every binding afterward, so a plain
    // mutation here is picked up for free -- making `log` @State too
    // would just trigger a second, redundant pass
    log: string[] = [];

    @Effect((ctx: DemoEffectLog) => [ctx.count])
    onCountChange(previous: number | undefined){
        const message = previous === undefined
            ? `initial count is ${this.count}`
            : `count changed from ${previous} to ${this.count}`;
        this.log = [message, ...this.log].slice(0, 4);
    }

    increment(){
        this.count++;
    }
}

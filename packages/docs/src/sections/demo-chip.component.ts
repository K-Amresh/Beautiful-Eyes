import { Component, ReactiveClass, Input } from '@beautiful-eyes/core';
import template from './demo-chip.template.be';

@Component({
    selector: 'DemoChip',
    useTemplate: template,
    useStyleSheets: []
})
export class DemoChip extends ReactiveClass {
    @Input() label = '';
    @Input() count = 0;
    onBump?: () => void;

    bump(){
        this.onBump?.();
    }
}

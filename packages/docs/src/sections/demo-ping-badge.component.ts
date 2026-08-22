import { Component, ReactiveClass, Input } from '@beautiful-eyes/core';
import template from './demo-ping-badge.template.be';

@Component({
    selector: 'DemoPingBadge',
    useTemplate: template,
    useStyleSheets: []
})
export class DemoPingBadge extends ReactiveClass {
    @Input() label = '';
    onPing?: () => void;

    ping(){
        this.onPing?.();
    }
}

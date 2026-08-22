import { Component, ReactiveClass, Input } from '@beautiful-eyes/core';
import template from './demo-name-badge.template.be';

@Component({
    selector: 'DemoNameBadge',
    useTemplate: template,
    useStyleSheets: []
})
export class DemoNameBadge extends ReactiveClass {
    @Input() label = '';
}

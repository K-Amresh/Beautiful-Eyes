import { ReactiveClass, Component, Input } from '@beautiful-eyes/core';
import template from './badge.template.be';

@Component({
    selector: 'Badge',
    useTemplate: template,
    useStyleSheets: []
})
export class Badge extends ReactiveClass{
    @Input() label = '';
}

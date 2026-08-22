import { Component, ReactiveClass, State, Input } from '@beautiful-eyes/core';
import template from './copy-command.template.be';

@Component({
    selector: 'CopyCommand',
    useTemplate: template,
    useStyleSheets: []
})
export class CopyCommand extends ReactiveClass {
    @Input() command = '';
    @State() copied = false;

    copy(){
        const text = this.command;
        if(navigator.clipboard && navigator.clipboard.writeText){
            navigator.clipboard.writeText(text).then(() => this.markCopied());
            return;
        }
        this.fallbackCopy(text);
        this.markCopied();
    }

    private markCopied(){
        this.copied = true;
        setTimeout(() => { this.copied = false; }, 1600);
    }

    private fallbackCopy(text: string){
        const el = document.createElement('textarea');
        el.value = text;
        el.setAttribute('readonly', '');
        el.style.position = 'fixed';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
}

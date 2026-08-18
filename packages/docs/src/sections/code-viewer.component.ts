import { Component, ReactiveClass, State, Input } from '@beautiful-eyes/core';
import template from './code-viewer.template.be';

export type CodeTab = { key: string; label: string; code: string };

// generic, reusable "tabbed code" panel -- pass any number of {key,label,code}
// tabs via $tabs. Used by the Examples page so adding a new tab (or a whole
// new example) never needs new tab-switching UI, only more data.
@Component({
    selector: 'CodeViewer',
    useTemplate: template,
    useStyleSheets: []
})
export class CodeViewer extends ReactiveClass {
    @Input() tabs: CodeTab[] = [];
    @State() selectedKey: string | null = null;

    get activeKey(){
        return this.selectedKey ?? this.tabs[0]?.key ?? '';
    }

    get activeCode(){
        const found = this.tabs.find(t => t.key === this.activeKey);
        return found ? found.code : '';
    }

    selectTab(key: string){
        this.selectedKey = key;
    }
}

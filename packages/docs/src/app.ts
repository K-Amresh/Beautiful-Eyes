import { bootstrap, Component, ReactiveClass, State } from '@beautiful-eyes/core';
import template from './app.template.be';
import './app.styles.scss';
import './sections/overview.component';
import './sections/reactive-class.component';
import './sections/components.component';
import './sections/templates.component';

@Component({
    selector: 'DocsApp',
    useTemplate: template,
    useStyleSheets: []
})
class DocsApp extends ReactiveClass {
    @State() activeTab = 'overview';

    tabs = [
        { key: 'overview', label: 'Overview' },
        { key: 'reactive-class', label: 'Reactive Class' },
        { key: 'components', label: 'Components' },
        { key: 'templates', label: 'Templates' },
    ];

    setTab(key: string){
        this.activeTab = key;
    }
}

const root = document.getElementById('root')!;
bootstrap(root, new DocsApp());

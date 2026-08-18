import { bootstrap, Component, ReactiveClass, State } from '@beautiful-eyes/core';
import template from './app.template.be';
import './app.styles.scss';
import './sections/overview.component';
import './sections/reactive-class.component';
import './sections/components.component';
import './sections/templates.component';
import './sections/examples.component';
import './sections/playground.component';
import './sections/contributing.component';
import './sections/backstory.component';
import './sections/sponsor.component';

@Component({
    selector: 'DocsApp',
    useTemplate: template,
    useStyleSheets: []
})
class DocsApp extends ReactiveClass {
    @State() activeTab = 'overview';
    @State() menuOpen = false;

    tabs = [
        { key: 'overview', label: 'Overview' },
        { key: 'reactive-class', label: 'Reactive Class' },
        { key: 'components', label: 'Components' },
        { key: 'templates', label: 'Templates' },
        { key: 'examples', label: 'Examples' },
        { key: 'playground', label: 'Playground' },
        { key: 'contributing', label: 'Contributing' },
        { key: 'backstory', label: 'Backstory' },
        { key: 'sponsor', label: 'Sponsor' },
    ];

    setTab(key: string){
        this.activeTab = key;
        this.menuOpen = false;
    }

    toggleMenu(){
        this.menuOpen = !this.menuOpen;
    }
}

const root = document.getElementById('root')!;
bootstrap(root, new DocsApp());

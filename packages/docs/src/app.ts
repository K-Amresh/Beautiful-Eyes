import { bootstrap, Component, ReactiveClass, State } from '@beautiful-eyes/core';
import template from './app.template.be';
import './app.styles.scss';
import './sections/overview.component';
import './sections/get-started.component';
import './sections/docs.component';
import './sections/playground.component';
import './sections/contributing.component';
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
        { key: 'get-started', label: 'Get Started' },
        { key: 'docs', label: 'Docs' },
        { key: 'playground', label: 'Playground' },
        { key: 'contributing', label: 'Contributing' },
        { key: 'sponsor', label: 'Sponsor' },
    ];

    get isWide(){
        return this.activeTab === 'docs' || this.activeTab === 'contributing';
    }

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

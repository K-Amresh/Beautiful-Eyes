import { Component, ReactiveClass, State } from '@beautiful-eyes/core';
import template from './children.template.be';
import './code-viewer.component';
import './demo-name-badge.component';
import './demo-ping-badge.component';
import './demo-chip.component';

@Component({
    selector: 'ChildrenDocs',
    useTemplate: template,
    useStyleSheets: []
})
export class ChildrenDocs extends ReactiveClass {
    @State() name = 'Ada';
    @State() pingName = 'Ada';
    @State() chips = [
        { id: 1, label: 'Coffee', count: 0 },
        { id: 2, label: 'Tea', count: 0 },
        { id: 3, label: 'Code', count: 0 },
    ];

    setName(e: Event){
        this.name = (e.target as HTMLInputElement).value;
    }

    ping(){
        this.pingName = this.pingName + '!';
    }

    trackChipById(chip: { id: number }){
        return chip.id;
    }

    bumpChip(id: number){
        const chip = this.chips.find(c => c.id === id);
        if(chip) chip.count++;
    }

    inputChildSample = `@Component({
    selector: 'Badge',
    useTemplate: template,
    useStyleSheets: []
})
class Badge extends ReactiveClass {
    @Input() label = '';
}`;

    inputParentSample = `@Component({
    selector: 'Parent',
    useTemplate: template,
    useStyleSheets: []
})
class Parent extends ReactiveClass {
    @State() name = 'Ada';
}

// parent.template.be
<Badge $label={name} />`;

    inputTabs = [
        { key: 'child', label: 'badge.ts', code: this.inputChildSample },
        { key: 'parent', label: 'parent.ts', code: this.inputParentSample },
    ];

    inputSetterSample = `// @Input setter -- same as @State, plus an identity check
set(val){
    if(value === val) return;   // same number, string, or object ref
    value = val;
    this.runSubscribers();      // CHILD tick, not parent
}`;

    storageSample = `// View.buildComponent -- runs in the PARENT's View
const anchor = document.createComment('component:Badge');
const child = new Badge();              // child's View + init already ran
applyProps(child, htmlObj.props);       // first paint: child.label = 'Ada'
anchor.nodeChild = child.view.root;     // child's real DOM, not a wrapper
queueMicrotask(() => insertAfter(anchor, child.view.root));

parent.reactiveElements.set(anchor, () => {
    applyProps(child, htmlObj.props);   // later parent ticks: re-apply $label
});`;

    afterMountSample = `parent.view.root
  Text("Ada")
  <!--component:Badge-->          // parent Map key: applyProps
      nodeChild = child.view.root
        <span>Ada</span>          // child's DOM, after the comment

parent.reactiveElements
  Text -> textContent = this.name
  Comment("component:Badge") -> applyProps(badge, { label: fn })

child.reactiveElements
  Text -> textContent = this.label

// parent.name = 'Bo'
//   parent Map runs: {name} becomes Bo, then applyProps writes child.label
//   @Input sees a new string, child Map runs: the span becomes Bo
// the parent never walks the child's interpolations`;

    storageTabs = [
        { key: 'build', label: 'buildComponent', code: this.storageSample },
        { key: 'after', label: 'after mount', code: this.afterMountSample },
    ];

    commentJobs = [
        { title: 'Stable slot', body: 'The parent needs one node to sit next to. The child may stamp several siblings. The comment is what buildNodeTree returns.' },
        { title: 'Map key', body: 'The parent updater that re-applies $props and @handlers lives on the comment, not on the child span -- that span belongs to the child Map.' },
        { title: 'Insertion cursor', body: 'child.view.root is inserted after the comment, once the comment has a parentNode. First paint is a queueMicrotask for that reason.' },
        { title: 'Unmount handle', body: 'unMountNode(comment) walks nodeChild, removes the child DOM, and drops the parent Map entry. That is how a child disappears when a parent @if / @for tears the hole down.' },
    ];

    pingChildSample = `@Component({
    selector: 'Badge',
    useTemplate: template,
    useStyleSheets: []
})
class Badge extends ReactiveClass {
    @Input() label = '';
    onPing?: () => void;    // plain field, not @Input

    ping(){
        this.onPing?.();
    }
}

// badge.template.be
<button @click={ping}>{label}</button>`;

    pingParentSample = `class Parent extends ReactiveClass {
    @State() name = 'Ada';
    ping(){ this.name = this.name + '!'; }
}

// parent.template.be
<Badge $label={name} @onPing={ping} />`;

    pingTabs = [
        { key: 'child', label: 'badge.ts', code: this.pingChildSample },
        { key: 'parent', label: 'parent.ts', code: this.pingParentSample },
    ];

    listSample = `@for(chip : chips; key = trackChipById){
  <DemoChip $label={chip.label} $count={chip.count} @onBump={() => bumpChip(chip.id)} />
}`;
}

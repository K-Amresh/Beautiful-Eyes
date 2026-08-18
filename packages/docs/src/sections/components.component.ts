import { Component, ReactiveClass, State } from '@beautiful-eyes/core';
import template from './components.template.be';
import './demo-chip.component';

@Component({
    selector: 'ComponentsDocs',
    useTemplate: template,
    useStyleSheets: []
})
export class ComponentsDocs extends ReactiveClass {
    @State() chips = [
        { id: 1, label: 'Coffee', count: 0 },
        { id: 2, label: 'Tea', count: 0 },
        { id: 3, label: 'Code', count: 0 },
    ];

    trackChipById(chip: { id: number }){
        return chip.id;
    }

    bumpChip(id: number){
        const chip = this.chips.find(c => c.id === id);
        if(chip) chip.count++;
    }

    todoItemSample = `import { Component, ReactiveClass, Input } from '@beautiful-eyes/core';
import template from './todo-item.template.be';

@Component({
    selector: 'TodoItem',
    useTemplate: template,
    useStyleSheets: []
})
export class TodoItem extends ReactiveClass {
    @Input() label = '';
    @Input() done = false;
    onToggle?: () => void;

    toggle(){
        this.onToggle?.();
    }
}`;

    registrationSample = `import './todo-item.component'; // registers 'TodoItem', even though nothing here uses the export`;

    usageSample = `<TodoItem $label={item.label} $done={item.done} @onToggle={() => toggleItem(item.id)}></TodoItem>

<!-- or self-closing -->
<TodoItem $label={item.label} $done={item.done} />`;

    nestingSample = `@for(item : items; key = trackById){
  <TodoItem $label={item.label} $done={item.done} @onToggle={() => toggleItem(item.id)} />
}`;
}

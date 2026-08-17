export type ComponentConstructor = new (...args:any[]) => any;

// selector -> decorated component class, populated by @Component({selector, ...})
export const ComponentRegistry = new Map<string, ComponentConstructor>();

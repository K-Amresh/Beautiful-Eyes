import { ReactiveClass } from "../reactiveClass/reactiveClass";

function runStateChangeSubscribers<This extends ReactiveClass>(this:This){
    this.runSubscribers();
}

// marks a field as receiving its value from a parent component's prop binding ($name=...)
// re-assigning it (done by the parent's View on every reactive pass) refreshes this
// instance's own reactive elements, same as @State does for locally-owned state
export function Input(){
    return function Input<This extends ReactiveClass, V>(target: undefined, ctx: ClassFieldDecoratorContext<This, V>) {
        ctx.addInitializer(function(this:This){
            let value = (this as any)[ctx.name];
            Object.defineProperty(this, ctx.name, {
                get(){
                    return value;
                },
                set(val:any){
                    if(value === val) return;
                    value = val;
                    runStateChangeSubscribers.call(this);
                }
            });
        });

        return function(this:This, val: V): V{
            return val;
        };
    };
}

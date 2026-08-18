import { DependencyFn } from "@beautiful-eyes/lib";
import { BatchedUpdates } from "@beautiful-eyes/lib/src/taskQueue/taskQueue";

export type Subscribers = Map<string, Set<string>> | null;

// effectSubscribers: dependency: state | computed -> effect
// computedSubscribers: dependency: stte | computed -> computed
// computed can't change without changing states
// hence no need to do anything when computed change
// when state change, determine what path of state was changes, and which computed were affected, store them in paths
// run loop on paths, run effectSubscribers for each path

type PrevValue = any;
type EffectFnName = string;
export class ReactiveClass implements BatchedUpdates{

    // per-instance (not static): each instance only tracks effects/computeds
    // declared on its own class, so unrelated ReactiveClass instances elsewhere
    // in the app can never have their effects invoked against the wrong `this`
    readonly effectSubscribers = new Map<DependencyFn, EffectFnName>;
    readonly computedSubscribers = new Map<string, Set<string>>;
    otherSubscriptions:Function[] = [];
    static instances = 0;

    batchedEffects:Set<string> | null = null;
    effectDepFnPreviousValue = new Map<DependencyFn, PrevValue>;

    constructor(){
        ReactiveClass.instances++;
    }

    // dependency: state | computed -> [effectNames]
    addEffectSubscribers(dependency:DependencyFn, context:ClassMethodDecoratorContext){
        this.effectSubscribers.set(dependency, context.name as string);
    }

    // dependency state | computed -> [effectNames]
    addComputedSubscribers(dependencies:string[], context:ClassGetterDecoratorContext){
        dependencies.forEach(dependency=>{
            let subscriber = this.computedSubscribers.get(dependency);
            if(!subscriber){
                subscriber = new Set();
                this.computedSubscribers.set(dependency, subscriber);
            }
            subscriber.add(context.name as string);
        });
    }

    runSubscribers(){
        this.effectSubscribers.forEach((effectFnName, dependency)=>{
            const latestValue = dependency(this);
            if(this.effectDepFnPreviousValue.has(dependency)){
                const prevValue = this.effectDepFnPreviousValue.get(dependency);
                for(let i=0;i<latestValue.length;i++){
                    if(latestValue[i]!==prevValue[i]){
                        (this as any)[effectFnName].call(this, prevValue[i]);
                    }
                }
            }
            else{
                for(let i=0;i<latestValue.length;i++){
                    (this as any)[effectFnName].call(this, undefined);
                }
            }
            this.effectDepFnPreviousValue.set(dependency, latestValue);
        });
        this.otherSubscriptions.forEach(subscription=>{
            subscription.call(this)
        });
    }

    comitBatchedItems(){
        // // running subscribers
        // if(!this.batchedEffects) return;
        // this.batchedEffects.forEach(effectFnName=>{
        //     (this as any)[effectFnName]?.call(this);
        // });
        // this.batchedEffects = null;
    }

    addOtherSubscription(fn:Function){
        this.otherSubscriptions.push(fn);
    }
};
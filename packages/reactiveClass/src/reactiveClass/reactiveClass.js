"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactiveClass = void 0;
class ReactiveClass {
    constructor() {
        // per-instance (not static): each instance only tracks effects/computeds
        // declared on its own class, so unrelated ReactiveClass instances elsewhere
        // in the app can never have their effects invoked against the wrong `this`
        this.effectSubscribers = new Map;
        this.computedSubscribers = new Map;
        this.otherSubscriptions = [];
        this.batchedEffects = null;
        this.effectDepFnPreviousValue = new Map;
        ReactiveClass.instances++;
    }
    // dependency: state | computed -> [effectNames]
    addEffectSubscribers(dependency, context) {
        this.effectSubscribers.set(dependency, context.name);
    }
    // dependency state | computed -> [effectNames]
    addComputedSubscribers(dependencies, context) {
        dependencies.forEach(dependency => {
            let subscriber = this.computedSubscribers.get(dependency);
            if (!subscriber) {
                subscriber = new Set();
                this.computedSubscribers.set(dependency, subscriber);
            }
            subscriber.add(context.name);
        });
    }
    runSubscribers() {
        this.effectSubscribers.forEach((effectFnName, dependency) => {
            const latestValue = dependency(this);
            if (this.effectDepFnPreviousValue.has(dependency)) {
                const prevValue = this.effectDepFnPreviousValue.get(dependency);
                for (let i = 0; i < latestValue.length; i++) {
                    if (latestValue[i] !== prevValue[i]) {
                        this[effectFnName].call(this, prevValue[i]);
                    }
                }
            }
            else {
                for (let i = 0; i < latestValue.length; i++) {
                    this[effectFnName].call(this, undefined);
                }
            }
            this.effectDepFnPreviousValue.set(dependency, latestValue);
        });
        this.otherSubscriptions.forEach(subscription => {
            subscription.call(this);
        });
    }
    comitBatchedItems() {
        // // running subscribers
        // if(!this.batchedEffects) return;
        // this.batchedEffects.forEach(effectFnName=>{
        //     (this as any)[effectFnName]?.call(this);
        // });
        // this.batchedEffects = null;
    }
    addOtherSubscription(fn) {
        this.otherSubscriptions.push(fn);
    }
}
exports.ReactiveClass = ReactiveClass;
ReactiveClass.instances = 0;
;

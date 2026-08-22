"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proxify = void 0;
const addParent_1 = require("../addParent/addParent");
const updateParent_1 = require("../updateParent/updateParent");
const addPath_1 = require("../addPath/addPath");
const proxyObjectKeys_1 = require("../proxyObjectKeys/proxyObjectKeys");
const types_1 = require("../../types/types");
class Proxify {
    static getProxyHandler(contextObj, cb) {
        return {
            set(target, prop, value, receiver) {
                const res = Reflect.set(target, prop, value, receiver);
                cb === null || cb === void 0 ? void 0 : cb();
                return res;
            },
            deleteProperty(target, prop) {
                const res = Reflect.deleteProperty(target, prop);
                cb === null || cb === void 0 ? void 0 : cb();
                return res;
            }
        };
    }
    static updatePathKeys(obj, target, path) {
        if (types_1.Types.isArray(obj) || types_1.Types.isObject(obj) || types_1.Types.isMap(obj) || types_1.Types.isSet(obj)) {
            obj[proxyObjectKeys_1.PROXY_OBJECT_KEYS.path] = target[proxyObjectKeys_1.PROXY_OBJECT_KEYS.path] + `.${String(path)}`;
        }
    }
    static makeProxy(obj) {
        if (!Proxify.proxyHandler) {
            throw new Error('proxyhandler not defined while trying to proxify an object');
        }
        return new Proxy(obj, Proxify.proxyHandler);
    }
    static proxifyArray(arr) {
        const proxy = Proxify.makeProxy(arr);
        for (let i = 0; i < arr.length; i++) {
            if (types_1.Types.isArray(arr[i])) {
                (0, updateParent_1.updateParent)(arr[i], arr);
                arr[i] = Proxify.proxifyArray(arr[i]);
            }
            else if (types_1.Types.isObject(arr[i])) {
                (0, updateParent_1.updateParent)(arr[i], arr);
                arr[i] = Proxify.proxifyObject(arr[i]);
            }
            else if (types_1.Types.isMap(arr[i]))
                arr[i] = Proxify.proxifyMap(arr[i]);
            else if (types_1.Types.isSet(arr[i]))
                arr[i] = Proxify.proxifySet(arr[i]);
        }
        return proxy;
    }
    static proxifyObject(obj) {
        const proxy = Proxify.makeProxy(obj);
        for (let key in obj) {
            if (key === proxyObjectKeys_1.PROXY_OBJECT_KEYS.parent) {
                continue;
            }
            if (types_1.Types.isArray(obj[key])) {
                (0, updateParent_1.updateParent)(obj[key], obj);
                obj[key] = Proxify.proxifyArray(obj[key]);
            }
            else if (types_1.Types.isObject(obj[key])) {
                (0, updateParent_1.updateParent)(obj[key], obj);
                obj[key] = Proxify.proxifyObject(obj[key]);
            }
            else if (types_1.Types.isMap(obj[key]))
                obj[key] = Proxify.proxifyMap(obj[key]);
            else if (types_1.Types.isSet(obj[key]))
                obj[key] = Proxify.proxifySet(obj[key]);
        }
        return proxy;
    }
    static proxifyMap(map) {
        for (let [key, val] of map.entries()) {
            if (types_1.Types.isArray(val))
                map.set(key, Proxify.proxifyArray(val));
            else if (types_1.Types.isObject(val))
                map.set(key, Proxify.proxifyObject(val));
            else if (types_1.Types.isMap(val))
                map.set(key, Proxify.proxifyMap(val));
            else if (types_1.Types.isSet(val))
                map.set(key, Proxify.proxifySet(val));
        }
        return Proxify.makeProxy(map);
    }
    static proxifySet(set) {
        return Proxify.makeProxy(set);
    }
    static get(obj, stateName, contextObj, parent = null, cb) {
        if (!obj)
            return obj; // empty string, 0, null undefined etc;
        if (types_1.Types.isNumber(obj) || types_1.Types.isString(obj))
            return obj;
        // adding parent to the object
        (0, addParent_1.addParent)(obj, parent);
        // adding path to root object, 
        // path of nested obj will be determined at runtime while accessing them in get trap
        !parent && (0, addPath_1.addPath)(obj, stateName);
        // setting proxy handler before proxifying
        Proxify.proxyHandler = Proxify.getProxyHandler(contextObj, cb);
        if (types_1.Types.isArray(obj))
            return Proxify.proxifyArray(obj);
        if (types_1.Types.isObject(obj))
            return Proxify.proxifyObject(obj);
        if (types_1.Types.isMap(obj))
            return Proxify.proxifyMap(obj);
        if (types_1.Types.isSet(obj))
            return Proxify.proxifySet(obj);
        Proxify.proxyHandler = null;
        throw new Error("only Array, Object, Map and Set can be Proxified");
    }
}
exports.Proxify = Proxify;
Proxify.proxyHandler = null;
;

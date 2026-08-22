"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentRegistry = void 0;
// selector -> decorated component class, populated by @Component({selector, ...})
exports.ComponentRegistry = new Map();

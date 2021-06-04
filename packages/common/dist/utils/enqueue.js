"use strict";
//
//  enqueue.ts
//  echoppe
//
//  Created by d-exclaimation on 14:18.
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.enqueue = void 0;
/**
 * Queued a function / callback to the macro / micro task (defaults to "macro")
 *
 * ---
 * e.g.
 * ```ts
 * enqueue(() => console.log("hello"));
 * console.log("hello again");
 * ```
 * 1. hello again
 * 2. hello
 */
var enqueue = function (task, options) {
    if (options === void 0) { options = { task: "macro", delay: 0 }; }
    return options.task === "macro"
        ? setTimeout(task, options.delay)
        : Promise.resolve().then(task);
};
exports.enqueue = enqueue;

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
 * Queued a function / callback to the macro / micro task.
 * Default option is macro task (right after the event loop).
 */
var enqueue = function (task, options) {
    if (options === void 0) { options = { task: "macro", delay: 0 }; }
    return options.task === "macro"
        ? setTimeout(task, options.delay)
        : Promise.resolve().then(task);
};
exports.enqueue = enqueue;

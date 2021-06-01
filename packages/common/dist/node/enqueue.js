"use strict";
//
//  enqueue.ts
//  echoppe
//
//  Created by d-exclaimation on 14:18.
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.enqueue = void 0;
var enqueue = function (task) { return setTimeout(task, 0); };
exports.enqueue = enqueue;

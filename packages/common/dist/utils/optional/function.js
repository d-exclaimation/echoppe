"use strict";
//
//  function.ts
//  echoppe
//
//  Created by d-exclaimation on 13:10.
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.optional = void 0;
/**
 * Applies Optional Function
 * Return a function if defined otherwise returnes a empty function
 */
var optional = function (fn) {
    return function (params) {
        return fn !== null && fn !== void 0 ? fn : (function () { });
    };
};
exports.optional = optional;

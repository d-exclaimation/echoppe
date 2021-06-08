"use strict";
//
//  parseCookie.ts
//  echoppe
//
//  Created by d-exclaimation on 15:09.
//
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCookie = void 0;
/** Get cookie from document and turn into a map */
function parseCookie(header, isWeb) {
    var _a;
    if (isWeb === void 0) { isWeb = false; }
    if (isWeb) {
        return new Map(document.cookie.split(";").map(function (val) {
            var _a = val.split("="), key = _a[0], token = _a[1];
            return [key, token];
        }));
    }
    return new Map((_a = header === null || header === void 0 ? void 0 : header.get("set-cookie")) === null || _a === void 0 ? void 0 : _a.split("; ").reduce(function (acc, curr) { return __spreadArray(__spreadArray([], acc), curr.split(", ")); }, []).map(function (val) {
        var _a = val.split("="), key = _a[0], token = _a[1];
        return [key, token];
    }));
}
exports.parseCookie = parseCookie;

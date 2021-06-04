"use strict";
//
//  parseCookie.ts
//  echoppe
//
//  Created by d-exclaimation on 15:09.
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCookie = void 0;
/** Get cookie from document and turn into a map */
function parseCookie() {
    return new Map(document.cookie.split(";").map(function (val) {
        var _a = val.split("="), key = _a[0], token = _a[1];
        return [key, token];
    }));
}
exports.parseCookie = parseCookie;

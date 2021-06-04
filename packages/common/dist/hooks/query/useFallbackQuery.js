"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFallbackQuery = void 0;
//
//  useFallbackQuery.ts
//  echoppe
//
//  Created by d-exclaimation on 20:00.
//
var react_query_1 = require("react-query");
/**
 * useQuery but with a fallback for failure on data, rather than catching on error
 *
 * use `null` for optional data types as undefined is used by react-query for data is still not there
 *
 * @param fallback Function called if `queryFn` throws anything, the throwned object and the faulty data will passed as parameter
 * @returns UseQueryResult wihout the error field and with the data is always defined
 */
function useFallbackQuery(queryKey, queryFn, fallback, options) {
    // Setup regular useQuery, but on different failure call the fallback to get returned data
    var result = react_query_1.useQuery(queryKey, queryFn, options);
    // Check if error is throwned or occured
    if (result.isError)
        return __assign(__assign({}, result), { data: fallback({ data: result.data, error: result.error }) });
    // Check if data still is undefined
    if (typeof result.data === "undefined")
        return __assign(__assign({}, result), { data: fallback({ data: result.data, error: result.error }) });
    return __assign(__assign({}, result), { data: result.data });
}
exports.useFallbackQuery = useFallbackQuery;

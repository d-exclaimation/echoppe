"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAllCartQuery = void 0;
//
//  useAllCartQuery.ts
//  echoppe
//
//  Created by d-exclaimation on 19:37.
//
var allListQuery_1 = require("./../api/allListQuery");
var useFallbackQuery_1 = require("./useFallbackQuery");
function useAllCartQuery() {
    var _a = useFallbackQuery_1.useFallbackQuery("all-cart-lists", allListQuery_1.allListQuery, function () { return []; }), data = _a.data, isLoading = _a.isLoading;
    return {
        data: data,
        isLoading: isLoading,
    };
}
exports.useAllCartQuery = useAllCartQuery;

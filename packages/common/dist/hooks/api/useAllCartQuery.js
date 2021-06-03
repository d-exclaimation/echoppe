"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAllCartQuery = void 0;
//
//  useAllCartQuery.ts
//  echoppe
//
//  Created by d-exclaimation on 19:37.
//
var allListQuery_1 = require("../../api/queries/allListQuery");
var useFallbackQuery_1 = require("../query/useFallbackQuery");
/**
 * Abstraction on top of useQuery for fetching all the cart lists
 * @returns data and isLoading state
 */
function useAllCartQuery() {
    var _a = useFallbackQuery_1.useFallbackQuery("all-cart-lists", allListQuery_1.allListQuery, function () { return []; }, { retry: 0 }), data = _a.data, isLoading = _a.isLoading;
    return {
        data: data,
        isLoading: isLoading,
    };
}
exports.useAllCartQuery = useAllCartQuery;

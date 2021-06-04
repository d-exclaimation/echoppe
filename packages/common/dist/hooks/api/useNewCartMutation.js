"use strict";
//
//  useNewCartMutation.ts
//  echoppe
//
//  Created by d-exclaimation on 20:27.
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNewCartMutation = void 0;
var react_query_1 = require("react-query");
var newCartMutation_1 = require("../../api/mutations/newCartMutation");
/**
 * Abstractions on top ose useMutation for creating cart
 *
 * @returns
 */
function useNewCartMutation(_a) {
    var onError = _a.onError, onSuccess = _a.onSuccess;
    var client = react_query_1.useQueryClient();
    var mutate = react_query_1.useMutation(newCartMutation_1.newCartMutation, {
        onSuccess: function () {
            client.invalidateQueries("one-time-token");
            client.invalidateQueries("all-cart-lists");
            onSuccess();
        },
        onError: onError,
        retry: 0,
    }).mutate;
    return mutate;
}
exports.useNewCartMutation = useNewCartMutation;

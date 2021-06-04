"use strict";
//
//  useDeleteCartMutation.ts
//  echoppe
//
//  Created by d-exclaimation on 22:07.
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeleteCartMutation = void 0;
var react_query_1 = require("react-query");
var deleteCartMutation_1 = require("../../api/mutations/deleteCartMutation");
/**
 * Abstractions on top ose useMutation for deleting cart
 *
 * @returns
 */
function useDeleteCartMutation(_a) {
    var onError = _a.onError, onSuccess = _a.onSuccess;
    var client = react_query_1.useQueryClient();
    var mutate = react_query_1.useMutation(deleteCartMutation_1.deleteCartMutation, {
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
exports.useDeleteCartMutation = useDeleteCartMutation;

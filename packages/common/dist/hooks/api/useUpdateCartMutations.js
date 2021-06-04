"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUpdateCartMutations = void 0;
var react_query_1 = require("react-query");
var updateCartMutations_1 = require("../../api/mutations/updateCartMutations");
/**
 * Abstractions on top ose useMutation for updating a singular cart
 *
 * @returns
 */
function useUpdateCartMutations(_a) {
    var onError = _a.onError, onSuccess = _a.onSuccess;
    var client = react_query_1.useQueryClient();
    var mutate = react_query_1.useMutation(updateCartMutations_1.updateCartMutations, {
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
exports.useUpdateCartMutations = useUpdateCartMutations;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLoginMutation = exports.useAuth = void 0;
var react_query_1 = require("react-query");
var loginMutation_1 = require("../api/mutations/loginMutation");
var meQuery_1 = require("../api/queries/meQuery");
var useFallbackQuery_1 = require("./useFallbackQuery");
function useAuth() {
    var _a = useFallbackQuery_1.useFallbackQuery("user-session", meQuery_1.meQuery, function () { return null; }, { retry: 1 }), isLoading = _a.isLoading, data = _a.data;
    return {
        isLoading: isLoading,
        isLoggedIn: !!data,
        user: data,
    };
}
exports.useAuth = useAuth;
function useLoginMutation(_a) {
    var onSuccess = _a.onSuccess, onError = _a.onError;
    var client = react_query_1.useQueryClient();
    var mutate = react_query_1.useMutation(loginMutation_1.loginMutation, {
        onSuccess: function () {
            client.invalidateQueries({
                predicate: function (query) { return query.queryKey == ""; },
            });
            client.invalidateQueries("all-cart-lists");
            client.invalidateQueries("user-session");
            onSuccess();
        },
        onError: onError,
        retry: 2,
    }).mutate;
    return mutate;
}
exports.useLoginMutation = useLoginMutation;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLogin = exports.useAuth = void 0;
var react_query_1 = require("react-query");
var loginMutation_1 = require("../api/loginMutation");
var meQuery_1 = require("./../api/meQuery");
function useAuth() {
    var _a = react_query_1.useQuery("user-session", meQuery_1.meQuery), isLoading = _a.isLoading, error = _a.error, data = _a.data;
    return {
        isLoading: isLoading,
        isLoggedIn: !error && !!data,
        user: data,
    };
}
exports.useAuth = useAuth;
function useLogin(_a) {
    var onSuccess = _a.onSuccess, onError = _a.onError;
    var client = react_query_1.useQueryClient();
    var mutate = react_query_1.useMutation(loginMutation_1.loginMutation, {
        onSuccess: function () {
            client.invalidateQueries("user-session");
            onSuccess();
        },
        onError: onError,
    }).mutate;
    return mutate;
}
exports.useLogin = useLogin;

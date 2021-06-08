"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePrequest = exports.useSignOutMutation = exports.useSignUpMutation = exports.useLoginMutation = exports.useAuth = void 0;
var react_query_1 = require("react-query");
var loginMutation_1 = require("../../api/mutations/loginMutation");
var meQuery_1 = require("../../api/queries/meQuery");
var parseCookie_1 = require("../../utils/parser/parseCookie");
var useFallbackQuery_1 = require("../query/useFallbackQuery");
var signOutMutation_1 = require("./../../api/mutations/signOutMutation");
var signUpMutation_1 = require("./../../api/mutations/signUpMutation");
var prequest_1 = require("./../../api/queries/prequest");
/**
 * Abstraction on to useQuery specific for validating user session for echoppe's server
 *
 * @returns an object containing the isLoading, isLoggedIn, and User state
 */
function useAuth() {
    var _a = useFallbackQuery_1.useFallbackQuery("user-session", meQuery_1.meQuery, function () { return null; }, { retry: 1 }), isLoading = _a.isLoading, data = _a.data;
    return {
        isLoading: isLoading,
        isLoggedIn: !!data,
        user: data,
    };
}
exports.useAuth = useAuth;
/**
 * Abstraction on to useMutation specific for login for echoppe's server
 * This function invalidates caches of `user-session` query and `all-cart-lists` query
 *
 * @returns the mutation function to fetch request and invalidates queries' cache
 */
function useLoginMutation(_a) {
    var onSuccess = _a.onSuccess, onError = _a.onError;
    var client = react_query_1.useQueryClient();
    var mutate = react_query_1.useMutation(loginMutation_1.loginMutation, {
        onSuccess: function () {
            client.invalidateQueries("one-time-token");
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
/**
 * Abstraction on to useMutation specific for sign up for echoppe's server
 * This function invalidates caches of `user-session` query and `all-cart-lists` query
 *
 * @returns the mutation function to fetch request and invalidates queries' cache
 */
function useSignUpMutation(_a) {
    var onSuccess = _a.onSuccess, onError = _a.onError;
    var client = react_query_1.useQueryClient();
    var mutate = react_query_1.useMutation(signUpMutation_1.signUpMutation, {
        onSuccess: function () {
            client.invalidateQueries("one-time-token");
            client.invalidateQueries("all-cart-lists");
            client.invalidateQueries("user-session");
            onSuccess();
        },
        onError: onError,
        retry: 2,
    }).mutate;
    return mutate;
}
exports.useSignUpMutation = useSignUpMutation;
/**
 * Abstraction on to useMutation specific for signout for echoppe's server
 * This function invalidates caches of `user-session` query and `all-cart-lists` query
 *
 * @returns the mutation function to fetch request and invalidates queries' cache
 */
function useSignOutMutation(_a) {
    var onSuccess = _a.onSuccess, onError = _a.onError;
    var client = react_query_1.useQueryClient();
    var mutate = react_query_1.useMutation(signOutMutation_1.signOutMutation, {
        onSuccess: function () {
            client.invalidateQueries("one-time-token");
            client.invalidateQueries("all-cart-lists");
            client.invalidateQueries("user-session");
            onSuccess();
        },
        onError: onError,
        retry: 2,
    }).mutate;
    return mutate;
}
exports.useSignOutMutation = useSignOutMutation;
/**
 * Abstraction on useQuery for fetching on time token
 *
 * @returns the fetching function
 */
function usePrequest(isWeb) {
    var _a;
    var _b = react_query_1.useQuery("one-time-token", prequest_1.prequest, {
        retry: 0,
    }), data = _b.data, isLoading = _b.isLoading, isError = _b.isError, refetch = _b.refetch;
    if (data && !isError && !isLoading) {
        var cookies = parseCookie_1.parseCookie(data, isWeb);
        return {
            isLoadingToken: isLoading,
            isTokenError: isError,
            token: (_a = cookies.get("csrf-token")) !== null && _a !== void 0 ? _a : null,
            refetch: refetch,
        };
    }
    return {
        isErrorToken: isError,
        isLoadingToken: isLoading,
        token: null,
        refetch: refetch,
    };
}
exports.usePrequest = usePrequest;

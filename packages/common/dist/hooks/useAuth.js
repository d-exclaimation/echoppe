"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = void 0;
var react_1 = require("react");
var loginMutation_1 = require("./../api/loginMutation");
var meQuery_1 = require("./../api/meQuery");
function useAuth() {
    var _a = react_1.useState(null), user = _a[0], setUser = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setLoading = _b[1];
    var authenticate = react_1.useCallback(function (email, password) {
        setLoading(true);
        loginMutation_1.loginMutation({ login: { email: email, password: password } })
            .then(function (user) {
            setUser(user);
            setLoading(true);
        })
            .catch(console.error);
    }, [setUser, setLoading]);
    var validateAuth = react_1.useCallback(function () {
        setLoading(true);
        meQuery_1.meQuery()
            .then(function (user) {
            setUser(user);
            setLoading(false);
        })
            .catch(function (e) { return console.log(e); });
    }, [setUser, setLoading]);
    react_1.useEffect(function () {
        validateAuth();
    }, []);
    var logOut = react_1.useCallback(function () { return setUser(null); }, [setUser]);
    return { user: user, isLoading: isLoading, authenticate: authenticate, validateAuth: validateAuth, logOut: logOut };
}
exports.useAuth = useAuth;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChannel = void 0;
var react_1 = require("react");
var SocketContext_1 = require("../../context/sockets/SocketContext");
/** @internal */
var defaultHandler = {
    init: function () { },
    error: function () { },
};
/**
 * useChannel hooks for handling phoenix channel subscriptions and broadcasting.
 *
 * Takes an id for the channel key, an initial join payload, and subscriptions
 *
 * Subscriptions includes on initial join response and join error response
 *
 * Required events
 * - `init` takes a generic parameter InitParams (server `join/3` response)
 * - `error` takes a generic parameter ErrorResponse (server `join/3` response)
 *
 * Required Context
 * - Sockets atm can be fetched from the context (just the socket inside the context, check line 58)
 * ---
 * Note:
 * - Add in types for other event subscriptions
 *
 * Example:
 * ```ts
 * type ShoutEvent = { msg: string; user: User; };
 * // provided `init` and `error` is already given
 * const push = useChannel("room:lobby", {}, { ..., shout: ({msg, user}: ShoutEvent) => {...}});
 * ```
 * ---
 * @template InitParams initial payload given by the server on `join/3`
 * @template InitPayload initial payload given to the server on `join/3`'s second parameter
 * @template ErrorResponse initial payload given back if an error occured on `join/3`
 */
function useChannel(id, initPayload, subs) {
    if (subs === void 0) { subs = defaultHandler; }
    // Grab sockets from context , initialize channel mutatable referrences
    var socket = react_1.useContext(SocketContext_1.SocketContext);
    var channelRef = react_1.useRef(null);
    // Create a fucntion to describe the return value
    var pushMessage = react_1.useCallback(function (event, payload) {
        if (!channelRef.current)
            return;
        return channelRef.current.push(event, payload, 1000);
    }, [channelRef]);
    // Initial setup, create channel, join and response accordingly
    react_1.useEffect(function () {
        channelRef.current = socket.channel(id, initPayload ? initPayload : {});
        channelRef.current
            .join()
            .receive("ok", subs.init)
            .receive("error", subs.error);
        // Applying all subscriptions filtering `init` and `error`
        var refs = Object.entries(subs)
            .filter(function (_a) {
            var key = _a[0], _ = _a[1];
            return key !== "init" && key === "error";
        })
            .map(function (_a) {
            var key = _a[0], resolver = _a[1];
            return [
                key,
                channelRef.current.on(key, function (resp) { return resolver(resp); }),
            ];
        });
        // Clean out by leaving channels and unsubscribing
        return function () {
            var _a;
            refs.forEach(function (_a) {
                var _b;
                var key = _a[0], ref = _a[1];
                return (_b = channelRef.current) === null || _b === void 0 ? void 0 : _b.off(key, ref);
            });
            (_a = channelRef.current) === null || _a === void 0 ? void 0 : _a.leave();
        };
    }, [id, initPayload]);
    return pushMessage;
}
exports.useChannel = useChannel;

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
 * useChannel hooks for handling phoenix channel subscriptions and broadcasting using provided Socket from context.
 *
 * Subscriptions are callbacks from events which includes on initial join and error response
 * - `init` takes a generic parameter InitParams (server `join/3` response)
 * - `error` takes a generic parameter ErrorResponse (server `join/3` response)
 * - `[any-event: string]` takes client-defined params (server `handle_in/3` response)
 * @returns push message to event function
 */
function useChannel(key, initPayload, subs) {
    if (subs === void 0) { subs = defaultHandler; }
    // Grab sockets from context , initialize channel mutatable referrences (no need for rerendering)
    var socket = react_1.useContext(SocketContext_1.SocketContext);
    var channelRef = react_1.useRef(null);
    // To bypass shallow comparison for useEffect
    var initPayloadHash = (function () { return JSON.stringify(initPayload); })();
    // Create a fucntion to describe the return value
    var pushMessage = react_1.useCallback(function (event, payload) {
        if (!channelRef.current)
            return;
        return channelRef.current.push(event, payload, 1000);
    }, [channelRef]);
    // Initial setup, create channel, join and response accordingly
    react_1.useEffect(function () {
        channelRef.current = socket.channel(key, initPayload ? initPayload : {});
        channelRef.current
            .join()
            .receive("ok", subs.init)
            .receive("error", subs.error);
        // Applying all subscriptions filtering `init` and `error`
        var refs = Object.entries(subs).map(function (_a) {
            var _b;
            var key = _a[0], resolver = _a[1];
            return [
                key,
                (_b = channelRef.current) === null || _b === void 0 ? void 0 : _b.on(key, function (resp) { return resolver(resp); }),
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
    }, [key, initPayloadHash]);
    return pushMessage;
}
exports.useChannel = useChannel;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChannel = void 0;
var react_1 = require("react");
var SocketContext_1 = require("../../context/sockets/SocketContext");
function useChannel(id, subscriptions) {
    var socket = react_1.useContext(SocketContext_1.SocketContext);
    var channelRef = react_1.useRef(null);
    var pushMessage = react_1.useCallback(function (event, payload) {
        if (!channelRef.current)
            return;
        return channelRef.current.push(event, payload, 1000);
    }, [channelRef]);
    react_1.useEffect(function () {
        channelRef.current = socket.channel("cart:" + id, {});
        channelRef.current
            .join()
            .receive("ok", subscriptions.init)
            .receive("error", function (resp) { return console.log(resp); });
        var refs = Object.entries(subscriptions)
            .filter(function (_a) {
            var key = _a[0], _ = _a[1];
            return key != "init";
        })
            .map(function (_a) {
            var key = _a[0], resolver = _a[1];
            return [
                key,
                channelRef.current.on(key, function (resp) { return resolver(resp); }),
            ];
        });
        return function () {
            var _a;
            (_a = channelRef.current) === null || _a === void 0 ? void 0 : _a.leave();
            refs.forEach(function (_a) {
                var _b;
                var key = _a[0], ref = _a[1];
                return (_b = channelRef.current) === null || _b === void 0 ? void 0 : _b.off(key, ref);
            });
        };
    }, [id]);
    return pushMessage;
}
exports.useChannel = useChannel;

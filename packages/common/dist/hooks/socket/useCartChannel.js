"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCartChannel = void 0;
//
//  useCartChannel.ts
//  echoppe
//
//  Created by d-exclaimation on 20:47.
//
var react_1 = require("react");
var parseCart_1 = require("../../utils/parser/parseCart");
var useChannel_1 = require("./useChannel");
function useCartChannel(id) {
    var _a = react_1.useState([]), items = _a[0], setItems = _a[1];
    var _b = react_1.useState(null), cart = _b[0], setCart = _b[1];
    var push = useChannel_1.useChannel(id, {
        data: function (_a) {
            var msg = _a.msg, user = _a.user;
            return setItems(function (prev) { return __spreadArray(__spreadArray([], prev), [user.username + ": " + msg]); });
        },
        init: function (_a) {
            var data = _a.data, list = _a.list;
            setItems(data);
            setCart(parseCart_1.parseCart(list));
        },
    });
    var insert = react_1.useCallback(function (res) {
        push("data", res);
    }, [push]);
    return { insert: insert, cart: cart, items: items };
}
exports.useCartChannel = useCartChannel;

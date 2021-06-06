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
var function_1 = require("./../../utils/optional/function");
var useChannel_1 = require("./useChannel");
/** @internal */
var defaultErrorHandler = {
    joinError: function () { },
    pushError: function () { },
};
/**
 * ~Abstraction on top useChannel for handling Cart Room Channel~
 *
 * TODO: Some the functionalities are temporarily
 * - `items` should be replaced with state of the cart and all of its items
 * - `insert` should be using a better event name
 * - missing `update`, `delete` function if these functionalities are seperated
 *
 * @returns all the states and `insert` function to broadcast changes
 */
function useCartChannel(id, user, _a) {
    var _b = _a === void 0 ? defaultErrorHandler : _a, pushError = _b.pushError, joinError = _b.joinError;
    var _c = react_1.useState([]), items = _c[0], setItems = _c[1];
    var _d = react_1.useState(null), cart = _d[0], setCart = _d[1];
    // using useChannel Hook providing, only one event of `data`
    var initPayload = react_1.useMemo(function () { return ({ user: user }); }, [user]);
    var push = useChannel_1.useChannel("cart:" + id, initPayload, {
        insert: function (_a) {
            var payload = _a.payload;
            setItems(function (prev) { return __spreadArray(__spreadArray([], prev), [payload]); });
        },
        delete: function (_a) {
            var payload = _a.payload;
            setItems(function (prev) { return prev.filter(function (item) { return item.id != payload.id; }); });
        },
        // required event subscriptions, join will gives use cart details which is set as state
        init: function (_a) {
            var items = _a.items, list = _a.list;
            console.log("this is reloaded");
            setItems(items);
            setCart(parseCart_1.parseCart(list));
        },
        // set the joinError optionally otherwise gives a blank function
        error: function_1.optional(joinError),
    });
    // Insert uses the data event to pass a payload, and all the error will be handle optionally
    var insert = react_1.useCallback(function (item) {
        var _a;
        (_a = push("insert", { item: item })) === null || _a === void 0 ? void 0 : _a.receive("error", function_1.optional(pushError));
    }, [push, initPayload]);
    var remove = react_1.useCallback(function (item) {
        var _a;
        (_a = push("delete", { id: item.id })) === null || _a === void 0 ? void 0 : _a.receive("error", function_1.optional(pushError));
    }, [push, initPayload]);
    return { insert: insert, cart: cart, items: items, remove: remove };
}
exports.useCartChannel = useCartChannel;

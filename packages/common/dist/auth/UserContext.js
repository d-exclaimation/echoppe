"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthContext = void 0;
var react_1 = require("react");
exports.AuthContext = react_1.createContext({
    type: "logged-out",
    authenticate: function () { },
});

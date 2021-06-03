"use strict";
//
//  useUserForm.ts
//  echoppe
//
//  Created by d-exclaimation on 13:28.
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserForm = void 0;
var react_1 = require("react");
/**
 * useUserForm is a react hook for handling common usage for user login / signup forms
 *
 * This hooks will returns states coupled as an object, so it can destructured,
 * and all the dispatchers as one object for the same reason
 * @returns all the states and dispacters seperated as tuples
 */
function useUserForm() {
    var _a = react_1.useState(""), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState(""), pass = _b[0], setPass = _b[1];
    var _c = react_1.useState(false), isShown = _c[0], setShown = _c[1];
    var updateEmail = react_1.useCallback(function (e) { return setEmail(e.target.value); }, [setEmail]);
    var updatePass = react_1.useCallback(function (e) { return setPass(e.target.value); }, [setPass]);
    var toggler = react_1.useCallback(function () { return setShown(function (prev) { return !prev; }); }, [setShown]);
    return [
        { email: email, pass: pass, isShown: isShown },
        { updateEmail: updateEmail, updatePass: updatePass, toggler: toggler },
    ];
}
exports.useUserForm = useUserForm;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCart = void 0;
var parseCart = function (_a) {
    var id = _a.id, title = _a.title, description = _a.description, due_date = _a.due_date;
    return ({
        id: id,
        title: title,
        description: description,
        due_date: new Date(due_date),
    });
};
exports.parseCart = parseCart;

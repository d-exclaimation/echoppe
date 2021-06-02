"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCart = void 0;
var parseCart = function (_a) {
    var id = _a.id, title = _a.title, description = _a.description, due_date = _a.due_date, updated_at = _a.updated_at;
    return ({
        id: id,
        title: title,
        description: description,
        due_date: due_date ? new Date(due_date) : null,
        updated_at: new Date(updated_at),
    });
};
exports.parseCart = parseCart;

"use strict";
//
//  SocketContext.ts
//  echoppe
//
//  Created by d-exclaimation on 17:25.
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketContext = void 0;
var phoenix_1 = require("phoenix");
var react_1 = require("react");
var index_1 = require("../../constants/index");
// Initialize and connect server given the socket endpoint
var socket = new phoenix_1.Socket(index_1.__socket__, {});
socket.connect();
exports.SocketContext = react_1.createContext(socket);

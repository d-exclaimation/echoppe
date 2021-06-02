"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__version__ = exports.__socket__ = exports.__endpoint__ = void 0;
exports.__endpoint__ = process.env.REACT_APP_URL || "http://localhost:4000";
exports.__socket__ = process.env.REACT_APP_SOCKET || "ws://localhost:4000/socket";
exports.__version__ = process.env.REACT_APP_VERSION || "v1-imposter";

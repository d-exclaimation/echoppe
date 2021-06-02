//
//  SocketContext.ts
//  echoppe
//
//  Created by d-exclaimation on 17:25.
//

import { Socket } from "phoenix";
import { createContext } from "react";
import { __socket__ } from "../../constants/index";

const socket = new Socket(__socket__, {});
socket.connect();
export const SocketContext = createContext(socket);

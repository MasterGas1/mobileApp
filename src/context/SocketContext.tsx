import { Dispatch, useEffect } from "react";
import socketService from '../api/Socket';
import { Socket } from "socket.io-client";

import dataContext from "./dataContext";

export interface SocketState {
    socket: typeof socketService | null
    errorMessage: string;
}

export type SocketAction =
    | {type: 'connect', payload: typeof socketService}


type SocketContextProps = {
    state: SocketState,
    connect: () => void
}

const socketReducer = (state: SocketState, action: SocketAction) => {

    switch (action.type) {
        case 'connect':
            return {
                ...state,
                socket: action.payload
            }
        default:
            return state
    }
}

const connect = (dispatch: Dispatch<SocketAction>) => () => {
    socketService.connect();
    dispatch({type: 'connect', payload: socketService})
}


export const {Provider, Context} = dataContext<SocketContextProps>(socketReducer, {
    connect
}, {
    socket: socketService,
    errorMessage: ''
})

import {Dispatch} from 'react';
import socketService from '../api/Socket';

import dataContext from './dataContext';

export interface SocketState {
  socketService: typeof socketService | null;
  connected: boolean;
  errorMessage: string;
}

export type SocketAction = {type: 'connect'; payload: typeof socketService};

type SocketContextProps = {
  state: SocketState;
  connect: () => void;
};

const socketReducer = (state: SocketState, action: SocketAction) => {
  switch (action.type) {
    case 'connect':
      return {
        ...state,
        connected: true,
        socketService: action.payload,
      };
    default:
      return state;
  }
};

const connect = (dispatch: Dispatch<SocketAction>) => async () => {
  await socketService.connect();
  if (socketService.socket?.connected) {
    console.log('Socket ID:', socketService.socket.id);
    dispatch({type: 'connect', payload: socketService});
  } else {
    socketService.socket?.on('connect', () => {
      console.log('Socket ID (desde evento):', socketService.socket?.id);
      dispatch({type: 'connect', payload: socketService});
    });
  }
};

export const {Provider, Context} = dataContext<SocketContextProps>(
  socketReducer,
  {
    connect,
  },
  {
    socket: socketService,
    errorMessage: '',
    connected: false,
  },
);

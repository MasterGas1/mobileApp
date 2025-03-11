import {Dispatch} from 'react';
import dataContext from './dataContext';

export interface PositionState {
  position: {
    latitude: number;
    longitude: number;
  };
}

export type PositionAction = {
  type: 'setNewPosition';
  payload: {
    latitude: number;
    longitude: number;
  };
};

type PositionContextProps = {
  state: PositionState;
  getPosition: (latitude: number, longitude: number) => void;
};

const positionReducer = (state: PositionState, action: PositionAction) => {
  switch (action.type) {
    case 'setNewPosition':
      return {
        ...state,
        position: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };
    default:
      return state;
  }
};

const getPosition =
  (dispatch: Dispatch<PositionAction>) =>
  (latitude: number, longitude: number) => {
    dispatch({type: 'setNewPosition', payload: {latitude, longitude}});
  };

export const {Provider, Context} = dataContext<PositionContextProps>(
  positionReducer,
  {
    getPosition,
  },
  {
    position: {
      latitude: 0,
      longitude: 0,
    },
  },
);

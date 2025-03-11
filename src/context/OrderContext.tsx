import {Dispatch} from 'react';

import dataContext from './dataContext';

import dbApi from '../api/DbApi';

import {OrderResponseInterface} from '../interface/orderInterface';

export interface OrderState {
  order: OrderResponseInterface | null;
}

export type OrderAction = {
  type: 'setOrder';
  payload: {
    order: OrderResponseInterface;
  };
};

type OrderContextProps = {
  state: OrderState;
  getOrder: () => void;
};

const orderReducer = (state: OrderState, action: OrderAction) => {
  switch (action.type) {
    case 'setOrder':
      return {
        ...state,
        order: action.payload.order,
      };
    default:
      return state;
  }
};

const getOrder = (dispatch: Dispatch<OrderAction>) => async () => {
  try {
    const {data} = await dbApi.get<OrderResponseInterface>(
      '/orders/firstOrderInstallerByToken',
    );

    console.log(data);
    dispatch({type: 'setOrder', payload: {order: data}});
  } catch (error) {
    console.log(error);
  }
};

export const {Provider, Context} = dataContext<OrderContextProps>(
  orderReducer,
  {
    getOrder,
  },
  {
    order: null,
  },
);

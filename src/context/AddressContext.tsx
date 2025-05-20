import {Dispatch} from 'react';
import axios from 'axios';

import dbApi from '../api/DbApi';

import {
  AddressInterface,
  AddressResponseInterface,
} from '../interface/addressInterface';

import dataContext from './dataContext';
import {ErrorResponseInterface} from '../interface/errorResponse';

export interface AddressState {
  addresses: AddressResponseInterface[];
  errorMessage: string;
  success: boolean;
}

export type AddressAction =
  | {type: 'getAddresses'; payload: AddressResponseInterface[]}
  | {type: 'addAddress'; payload: AddressResponseInterface}
  | {type: 'updateAddress'; payload: AddressResponseInterface}
  | {type: 'deleteAddress'; payload: string}
  | {type: 'errorMessage'; payload: string};

type AddressContextProps = {
  state: AddressState;
  getAddresses: () => void;
  addAddress: (address: AddressInterface) => void;
  updateAddress: (id: string, address: AddressInterface) => void;
  deleteAddress: (id: string) => void;
  clearErrorMessage: () => void;
};

export const addressReducer = (
  state: AddressState,
  action: AddressAction,
): AddressState => {
  switch (action.type) {
    case 'getAddresses':
      return {
        ...state,
        addresses: action.payload,
        errorMessage: '',
        success: true,
      };
    case 'addAddress':
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
        errorMessage: '',
        success: true,
      };
    case 'updateAddress':
      return {
        ...state,
        addresses: state.addresses.map(address =>
          address._id === action.payload._id ? action.payload : address,
        ),
        errorMessage: '',
        success: true,
      };

    case 'deleteAddress':
      return {
        ...state,
        addresses: state.addresses.filter(
          address => address._id !== action.payload,
        ),
        errorMessage: '',
        success: true,
      };
    case 'errorMessage':
      return {
        ...state,
        errorMessage: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const getAddresses = (dispatch: Dispatch<AddressAction>) => async () => {
  try {
    const {data} = await dbApi.get<AddressResponseInterface[]>('/address');
    dispatch({type: 'getAddresses', payload: data});
  } catch (error: any) {
    console.log(error);
  }
};

export const addAddress =
  (dispatch: Dispatch<AddressAction>) => async (address: AddressInterface) => {
    try {
      const {data} = await dbApi.post<AddressResponseInterface>(
        '/address',
        address,
      );
      dispatch({type: 'addAddress', payload: data});
    } catch (error) {
      if (axios.isAxiosError<ErrorResponseInterface>(error)) {
        console.log(error.response?.data.message);
        dispatch({
          type: 'errorMessage',
          payload: error.response?.data.message || '',
        });
      }
    }
  };

export const updateAddress =
  (dispatch: Dispatch<AddressAction>) =>
  async (id: string, address: AddressInterface) => {
    try {
      const {data} = await dbApi.put<AddressResponseInterface>(
        `/address/${id}`,
        address,
      );
      dispatch({type: 'updateAddress', payload: data});
    } catch (error) {
      if (axios.isAxiosError<ErrorResponseInterface>(error)) {
        console.log(error.response?.data.message);
        dispatch({
          type: 'errorMessage',
          payload: error.response?.data.message || '',
        });
      }
    }
  };

export const deleteAddress =
  (dispatch: Dispatch<AddressAction>) => async (id: string) => {
    try {
      await dbApi.delete(`/address/${id}`);

      dispatch({type: 'deleteAddress', payload: id});
    } catch (error) {
      console.log(error);
    }
  };

export const clearErrorMessage =
  (dispatch: Dispatch<AddressAction>) => async () => {
    dispatch({type: 'errorMessage', payload: ''});
  };

export const {Provider, Context} = dataContext<AddressContextProps>(
  addressReducer,
  {
    getAddresses,
    addAddress,
    updateAddress,
    clearErrorMessage,
    deleteAddress,
  },
  {
    addresses: [],
    errorMessage: '',
    success: null,
  },
);

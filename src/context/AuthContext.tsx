import {Dispatch} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import dbApi from '../api/DbApi';

import dataContext from './dataContext';

import {UserRequestInterface} from '../interface/signupInterface';
import {
  CustomerByTokenInterface,
  UserResponseLoginInterface,
  UserResponseTokenInterface,
} from '../interface/userInterface';
import {LoginInterface} from '../interface/loginInterface';
import {ErrorResponseInterface} from '../interface/errorResponse';

export interface AuthState {
  token: string | null;
  role: string | null;
  user: CustomerByTokenInterface;
  errorMessage: {
    message: string;
    screen: 'signin' | 'signup';
  } | null;
}

export type AuthAction =
  | {
      type: 'signup';
      payload: {name: string; lastName: string; token: string; role: string};
    }
  | {type: 'logout'; payload: {}}
  | {
      type: 'checkToken';
      payload: {
        id: string;
        name: string;
        lastName: string;
        token: string;
        role: string;
      };
    }
  | {
      type: 'errorMessage';
      payload: {errorMessage: string; screen: 'signin' | 'signup'};
    }
  | {
      type: 'clearErrorMessage';
      payload: {};
    };

type AuthContextProps = {
  state: AuthState;
  signup: (body: UserRequestInterface) => void;
  signin: (body: LoginInterface) => void;
  signout: () => void;
  clearErrorMessage: () => void;
  checkToken: () => void;
};
const authReducer = (prevState: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'signup':
      return {
        ...prevState,
        token: action.payload.token,
        role: action.payload.role,
        errorMessage: null,
      };
    case 'logout':
      return {
        ...prevState,
        token: null,
        role: null,
        errorMessage: null,
      };
    case 'checkToken':
      return {
        ...prevState,
        user: {
          name: action.payload.name,
          lastName: action.payload.lastName,
          _id: action.payload.id,
        },
        token: action.payload.token,
        role: action.payload.role,
      };
    case 'errorMessage':
      return {
        ...prevState,
        errorMessage: {
          message: action.payload.errorMessage,
          screen: action.payload.screen,
        },
      };
    case 'clearErrorMessage':
      return {
        ...prevState,
        errorMessage: null,
      };
    default:
      return prevState;
  }
};

const signup =
  (dispatch: Dispatch<AuthAction>) => async (body: UserRequestInterface) => {
    try {
      const {data} = await dbApi.post<UserResponseLoginInterface>(
        '/customer',
        body,
      );
      dispatch({
        type: 'signup',
        payload: {
          name: data.name,
          lastName: data.lastName,
          token: data.token,
          role: data.role,
        },
      });

      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('role', data.role);
    } catch (error) {
      if (axios.isAxiosError<ErrorResponseInterface>(error)) {
        dispatch({
          type: 'errorMessage',
          payload: {
            errorMessage: error.response?.data.message as string,
            screen: 'signup',
          },
        });
      } else {
        console.log(error);
      }
    }
  };

const signin =
  (dispatch: Dispatch<AuthAction>) => async (body: LoginInterface) => {
    try {
      const {data} = await dbApi.post<UserResponseLoginInterface>(
        '/auth',
        body,
      );
      dispatch({
        type: 'signup',
        payload: {
          name: data.name,
          lastName: data.lastName,
          token: data.token,
          role: data.role,
        },
      });
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('role', data.role);
    } catch (error) {
      if (axios.isAxiosError<ErrorResponseInterface>(error)) {
        dispatch({
          type: 'errorMessage',
          payload: {
            errorMessage: error.response?.data.message as string,
            screen: 'signin',
          },
        });
      }
      console.log(error);
    }
  };

const signout = (dispatch: Dispatch<AuthAction>) => async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('role');
  dispatch({type: 'logout', payload: {}});
};

const clearErrorMessage = (dispatch: Dispatch<AuthAction>) => () => {
  dispatch({type: 'clearErrorMessage', payload: {}});
};

const checkToken = (dispatch: Dispatch<AuthAction>) => async () => {
  const token = await AsyncStorage.getItem('token');
  const role = await AsyncStorage.getItem('role');
  if (token && role) {
    try {
      const {data} = await dbApi.get<UserResponseTokenInterface>('/user');

      dispatch({
        type: 'checkToken',
        payload: {
          id: data._id,
          name: data.name,
          lastName: data.lastName,
          token: token,
          role: role,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const {Provider, Context} = dataContext<AuthContextProps>(
  authReducer,
  {signup, clearErrorMessage, signin, signout, checkToken},
  {
    token: null,
    user: {
      name: '',
      lastName: '',
      _id: '',
    },
    errorMessage: null,
    role: null,
  },
);

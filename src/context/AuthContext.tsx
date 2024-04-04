import { Dispatch } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import dbApi from "../api/DbApi";

import dataContext from "./dataContext";

import { UserRequestInterface } from '../interface/signupInterface';
import { UserResponseInterface } from "../interface/userInterface";
import { LoginInterface } from "../interface/loginInterface";

export interface AuthState {
    token: string | null;
    role: string | null;
    errorMessage: string;
}

export type AuthAction = 
    | {type: 'signup', payload: {name: string, lastName: string, token: string, role: string}}
    | {type: 'logOut', payload: {}}
    | {type: 'errorMessage', payload: {errorMessage: string}}


type AuthContextProps = {
    state: AuthState,
    signup: (body: UserRequestInterface) => void,
    signin: (body: LoginInterface) => void,
    clearErrorMessage: () => void
}
const authReducer = (prevState: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'signup':
            return {
                token: action.payload.token,
                role: action.payload.role,
                errorMessage: ''
            }
        case 'errorMessage':
            return {
                ...prevState,
                errorMessage: action.payload.errorMessage.split(':')[1]
            }
        default:
            return prevState
    }
}

const signup = (dispatch: Dispatch<AuthAction>) => async(body: UserRequestInterface) => {
    try {

        const {data} = await dbApi.post<UserResponseInterface>('/user/customer', body)
        dispatch({type: 'signup', payload: {name: data.name, lastName: data.lastName, token: data.token, role: data.role}})

        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('role', data.role);
    } catch (error: any) {
        if (error.response.data) {
            dispatch({type: 'errorMessage', payload: {errorMessage: error.response.data.message}})
        }
    }
}

const signin = (dispatch: Dispatch<AuthAction>) => async(body: LoginInterface) => {
    try {
        const {data} = await dbApi.post<UserResponseInterface>('/user/auth', body)
        dispatch({type: 'signup', payload: {name: data.name, lastName: data.lastName, token: data.token, role: data.role}})
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('role', data.role);
    }catch(error: any) {
        if (error.response.data) {
            dispatch({type: 'errorMessage', payload: {errorMessage: error.response.data.message}})
        }
    }
}

const clearErrorMessage = (dispatch: Dispatch<AuthAction>) => () => {
    dispatch({type: 'errorMessage', payload: {errorMessage: ''}})
}

export const {Provider, Context} = dataContext<AuthContextProps>(authReducer, 
    { signup, 
      clearErrorMessage,
      signin
    }, 
    {
        token: null,
        errorMessage: ''
    })
import { Dispatch } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import dbApi from "../api/DbApi";

import dataContext from "./dataContext";

import { UserRequestInterface } from '../interface/signupInterface';
import { UserResponseInterface } from "../interface/userInterface";

export interface AuthState {
    token: string | null;
    errorMessage: string;
}

export type AuthAction = 
    | {type: 'signup', payload: {name: string, lastName: string, token: string}}
    | {type: 'signin', payload: {}}
    | {type: 'logOut', payload: {}}
    | {type: 'errorMessage', payload: {errorMessage: string}}


type AuthContextProps = {
    state: AuthState,
    signup: (body: UserRequestInterface) => void,
    clearErrorMessage: () => void
}
const authReducer = (prevState: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'signup':
            return {
                ...prevState,
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

        dispatch({type: 'signup', payload: {name: body.name, lastName: body.lastName, token: data.token}})
        
        await AsyncStorage.setItem('token', data.token);
    } catch (error: any) {
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
      clearErrorMessage}, 
    {
        token: null,
        errorMessage: ''
    })
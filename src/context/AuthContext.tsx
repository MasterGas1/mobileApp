import { Dispatch } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import dbApi from "../api/DbApi";

import dataContext from "./dataContext";

import {UserRequestInterface } from '../interface/signupInterface';
import { CustomerByTokenInterface, UserResponseLoginInterface, UserResponseTokenInterface } from "../interface/userInterface";
import { LoginInterface } from "../interface/loginInterface";

export interface AuthState {
    token: string | null;
    role: string | null;
    user: CustomerByTokenInterface;
    errorMessage: string;
}

export type AuthAction = 
    | {type: 'signup', payload: {name: string, lastName: string, token: string, role: string}}
    | {type: 'logout', payload: {}}
    | {type: 'checkToken', payload: {id: string, name: string, lastName: string, token: string, role: string}}
    | {type: 'errorMessage', payload: {errorMessage: string}}


type AuthContextProps = {
    state: AuthState,
    signup: (body: UserRequestInterface) => void,
    signin: (body: LoginInterface) => void,
    signout: () => void,
    clearErrorMessage: () => void,
    checkToken: () => void
}
const authReducer = (prevState: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'signup':
            return {
                ...prevState,
                token: action.payload.token,
                role: action.payload.role,
                errorMessage: ''
            }
        case 'logout':
            return {
                ...prevState,
                token: null,
                role: null,
                errorMessage: ''
            }
        case 'checkToken':
            return {
                ...prevState,
                user: {
                    name: action.payload.name,
                    lastName: action.payload.lastName,
                    _id: action.payload.id
                },
                token: action.payload.token,
                role: action.payload.role
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

        const {data} = await dbApi.post<UserResponseLoginInterface>('/customer', body)
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
        const {data} = await dbApi.post<UserResponseLoginInterface>('/auth', body)
        dispatch({type: 'signup', payload: {name: data.name, lastName: data.lastName, token: data.token, role: data.role}})
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('role', data.role);
    }catch(error: any) {
        console.log(error)

    }
}

const signout = (dispatch: Dispatch<AuthAction>) => async() => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('role');
    dispatch({type: 'logout', payload: {}})
}

const clearErrorMessage = (dispatch: Dispatch<AuthAction>) => () => {
    dispatch({type: 'errorMessage', payload: {errorMessage: ''}})
}

const checkToken = (dispatch: Dispatch<AuthAction>) => async() => {

    const token = await AsyncStorage.getItem('token')
    const role = await AsyncStorage.getItem('role')
    
    if(token && role) {

        try {
            const {data} = await dbApi.get<UserResponseTokenInterface>('/user')
    
            dispatch({type: 'checkToken', payload: {id: data._id, name: data.name, lastName: data.lastName, token: token, role: role}})
            
        } catch(error) {
            console.log(error)
        }
    }
}

export const {Provider, Context} = dataContext<AuthContextProps>(authReducer, 
    { signup, 
      clearErrorMessage,
      signin,
      signout,
      checkToken
    }, 
    {
        token: null,
        user: {
            name: '',
            lastName: '',
            _id: '',
        },
        errorMessage: '',
        role: null,

    })
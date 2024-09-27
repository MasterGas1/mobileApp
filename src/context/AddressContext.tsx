import { Dispatch } from "react";

import dbApi from "../api/DbApi";

import { AddressInterface, AddressResponseInterface } from "../interface/addressInterface";

import dataContext from "./dataContext";

export interface AddressState {
    addresses: AddressResponseInterface[];
    errorMessage: string;
}

export type AddressAction =
    | { type: 'getAddresses', payload: AddressResponseInterface[] }
    | { type: 'addAddress', payload: AddressResponseInterface }

type AddressContextProps = {
    state: AddressState;
    getAddresses: () => void;
    addAddress: (address: AddressInterface) => void;
}


export const addressReducer = (state: AddressState, action: AddressAction): AddressState => {

    switch (action.type) {
        case 'getAddresses':
            return {
                ...state,
                addresses: action.payload
            }
        case 'addAddress':
            return {
                ...state,
                addresses: [...state.addresses, action.payload]
            }
        default:
            return state
    }
}

export const getAddresses = (dispatch: Dispatch<AddressAction>) => async() => {

    try {
        const {data} = await dbApi.get<AddressResponseInterface[]>('/address')
        dispatch({type: 'getAddresses', payload: data})
    }catch(error: any) {
        console.log(error)
    }
}

export const addAddress = (dispatch: Dispatch<AddressAction>) => async(address: AddressInterface) => {

    try {
        const {data} = await dbApi.post<AddressResponseInterface>('/address', address)
        dispatch({type: 'addAddress', payload: data})
    }catch(error: any) {
        console.log(error.response.data)
    }
}

export const {Provider, Context} = dataContext<AddressContextProps>(addressReducer, 
    {
        getAddresses,
        addAddress
    }, 
    {
        addresses: [],
        errorMessage: ''
    }
)
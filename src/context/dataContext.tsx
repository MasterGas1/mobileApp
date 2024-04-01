import {createContext, Reducer, useReducer } from "react";
import { AuthState } from "./AuthContext";

function dataContext<T>(reducer: any, actions: any, defaultValue: any) {
    const Context = createContext({} as T);

    const Provider = ({children}: any) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);

        const boundActions:any = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return (
            <Context.Provider
                value={{state, ...boundActions}}
            >
                {children}
            </Context.Provider>
        )
    }

    return {Context, Provider}
}

export default dataContext;
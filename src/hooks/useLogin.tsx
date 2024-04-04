import { useEffect, useRef, useState } from "react";
import { LoginInterface } from "../interface/loginInterface";

export const useLogin = ({email, password}: LoginInterface) => {

    const [state, setState] = useState({
        errorEmail: '',
        errorPassword: '',

    })

    const isMounted = useRef(false)
    const isValid = useRef(false)

    let validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    useEffect(() => {
        if (isMounted.current) {
            setState({
                errorEmail: email.match(validEmailRegex) ? '' : state.errorEmail,
                errorPassword: password.length > 7 ? '' : state.errorPassword
            })

            isValid.current = email.match(validEmailRegex) && password.length > 7 ? true : false
        }

        isMounted.current = true
    },[email, password])

    const validateInput = () => {
        setState({
            errorEmail: email.match(validEmailRegex) ? '' : 'El correo debe ser valido',
            errorPassword: password.length > 7 ? '' : 'La contraseña debe ser igual o mayor a 8 caracteres',
        })
    }

    return {
        ...state,
        isValid,
        validateInput
    }
}
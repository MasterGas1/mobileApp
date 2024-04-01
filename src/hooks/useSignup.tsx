import { useEffect, useState, useRef } from "react"
import { UserSignUpFormInterface } from "../interface/signupInterface"

export const useValidateSignup = ({name,lastName,email,password, confirmPassword}: UserSignUpFormInterface) => {
    
    const [state, setState] = useState({
        errorName: '',
        errorLastName: '',
        errorPassword: '',
        errorEmail: '',
        errorConfirmPassword: ''
    })


    const isMounted = useRef(false)
    const isValid = useRef(false)

    
    let validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    useEffect(() => {
        if (isMounted.current) {

            setState({
                ...state,
                errorName: name.length > 3 ? '' : state.errorName,
                errorLastName: lastName.length > 3 ? '' : state.errorLastName,
                errorPassword: password.length > 7 ? '' : state.errorPassword,
                errorEmail: email.match(validEmailRegex) ? '' : state.errorEmail,
                errorConfirmPassword: password === confirmPassword && password.length > 7 && confirmPassword.length > 7 ? '' : state.errorConfirmPassword,
            })


            if (name.length > 3 && lastName.length > 3 && email.match(validEmailRegex) && password.length > 7 && password === confirmPassword && confirmPassword.length > 7) {
                isValid.current = true
            } else {
                isValid.current = false
            }
        }
        isMounted.current = true
    },[name,lastName,password,email,confirmPassword])

    const validateInput = async () => {
        setState({
            ...state,
            errorName: name.length > 3 ? '' : 'El nombre debe ser igual o mayor a 4 caracteres',
            errorLastName: lastName.length > 3 ? '' : 'El apellido ser igual o mayor a 4 caracteres',
            errorPassword: password.length > 7 ? '' : 'La contraseña debe ser igual o mayor a 8 caracteres',
            errorEmail: email.match(validEmailRegex) ? '' : 'El correo debe ser valido',
            errorConfirmPassword: password === confirmPassword && password.length > 7 && confirmPassword.length > 7 ? '' : 'Las contraseñas no coinciden',
        })
    }

    return {
        ...state,
        isValid,
        validateInput
    }
}
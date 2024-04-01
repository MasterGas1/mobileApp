import { useEffect, useRef, useState } from "react";

import { CustomerInterface } from "../interface/signupInterface";

export const useValidateFiscalSignup = ({rfc, taxResidence}: CustomerInterface) => {

    const [state, setState] = useState({
        errorRfc: '',
        errorTaxResidence: ''
    })

    const isMounted = useRef(false)
    const isValid = useRef(false)

    useEffect(() => {
        
        if (isMounted.current) {
            setState({
                ...state,
                errorRfc: rfc.length > 11 && rfc.length < 14 ? '' : state.errorRfc,
                errorTaxResidence: taxResidence !== '' ? '' : state.errorTaxResidence
            })

            isValid.current = rfc.length > 11 && rfc.length < 14 && taxResidence !== ''
        }

        isMounted.current = true
    },[rfc, taxResidence])

    const validateFiscalInput = async () => {

        setState({
            ...state,
            errorRfc: rfc.length > 11 && rfc.length < 14 ? '' : "El RFC debe ser de 13 o 12 caracteres",
            errorTaxResidence: taxResidence !== '' ? '' : "La residencia fiscal es requerida"
        })

        isValid.current = rfc.length > 11 && rfc.length < 14 && taxResidence !== ''
    }

    return {
        ...state,
        isValid,
        validateFiscalInput
    }
}
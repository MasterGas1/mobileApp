import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'

import InputSignup from '../components/InputSignup'

import { globalColors } from '../styles/globalVariables'
import Spacer from '../components/common/Spacer'
import RegisterButton from '../components/common/PrincipalButton'

import { Context as AuthContext} from '../context/AuthContext'
import { useForm } from '../hooks/useForm'
import { RootStackParams } from '../navigation/PrincipalStackNavigation'
import { useValidateFiscalSignup } from '../hooks/useFiscalSignup'
import ErrorAlert from '../components/common/ErrorAlert'

interface Props extends StackScreenProps<RootStackParams, 'FiscalScreen'> {}

const FiscalScreen = ({route, navigation}: Props) => {

    const {rfc, taxResidence, form, onChange} = useForm({
        rfc:'',
        taxResidence: '',
    });

    const {errorRfc, errorTaxResidence, isValid ,validateFiscalInput} = useValidateFiscalSignup({rfc, taxResidence});

    const {signup, clearErrorMessage, state} = useContext(AuthContext)

    useEffect(() => {
       const unsubcribe = navigation.addListener('beforeRemove', () => { //Clear error message before going back
           clearErrorMessage();
       })

       return unsubcribe;
    })

    const onPressRegister = () => {
        validateFiscalInput();
        
        if (isValid.current) {//validate if eveything is correct
            const body = {
                ...form,
                ...route.params.form
            } //Conbine the two objects to send

            signup(body);
        }

    }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Datos Fiscales</Text>
        
        <View style={styles.containerForm}>
            <InputSignup 
                label="RFC"
                name='rfc'
                value={rfc}
                onChangeText={onChange}
                isThereError={errorRfc}
            />
            <Spacer/>
            <InputSignup
                label="Domicilio Fiscal"
                name='taxResidence'
                value={taxResidence}
                onChangeText={onChange}
                isThereError={errorTaxResidence}
            />
        </View>
        
        {
            state.errorMessage 
            ? <ErrorAlert
                errorMessage={state.errorMessage}
              />
            : null
        }
        <Spacer/>
        <RegisterButton 
            label="REGISTRAR"
            onPress={() => onPressRegister()}
        />
        <Spacer/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
        borderWidth: 1
    },
    title: {
        marginTop: 15,
        marginBottom: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: globalColors.principalColor
    },
    containerForm: {
        flex: 2,
        width: '100%',
    }
})

export default FiscalScreen
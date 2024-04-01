import { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'

import InputSignup from '../components/InputSignup'
import Spacer from '../components/common/Spacer'
import { RootStackParams } from '../navigation/PrincipalStackNavigation'

import { globalColors } from '../styles/globalVariables'
import RegisterButton from '../components/common/RegisterButton'
import { useForm } from '../hooks/useForm'
import { useValidateSignup } from '../hooks/useSignup'

type LoginScreenNavigationProp = StackNavigationProp<RootStackParams, 'SignupScreen'>
const SignupScreen = () => {

    
    const navigation = useNavigation<LoginScreenNavigationProp>()

    const [confirmPassword, setConfirmPassword] = useState('')
    
    const { name, lastName, email, password, form ,onChange } = useForm({
        name: '',
        lastName: '',
        email: '',
        password: '',
    }) //This a hook to manage inputs
    
    const {errorName, errorLastName, 
        errorEmail, errorPassword, isValid,
        errorConfirmPassword, validateInput} = useValidateSignup({...form, confirmPassword}); //This a hook to validate inputs


    const onPressRegister = () => {
        validateInput();
        if (isValid.current) { //validate if eveything is correct
            navigation.navigate('FiscalScreen', {form}) //navigate to next screen and send the form
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <ScrollView style={styles.containerForm}>
        <InputSignup 
            label="Nombre (s)"
            name='name'
            value={name}
            onChangeText={onChange}
            isThereError={errorName}
        />
        <Spacer/>
        <InputSignup 
            label="Apellido (s)"
            name='lastName'
            value={lastName}
            onChangeText={onChange}
            isThereError={errorLastName}
        />
        <Spacer/>
        <InputSignup 
            label="Correo electronico"
            name='email'
            value={email}
            onChangeText={onChange}
            isThereError={errorEmail}
            autoCapitalize='none'
        />
        <Spacer/>
        <InputSignup 
            label="Contraseña"
            name='password'
            value={password}
            secureTextEntry
            onChangeText={onChange}
            isThereError={errorPassword}
            autoCapitalize='none'
        />
        <Spacer/>
        <InputSignup 
            label="Confirmar contraseña"
            name='confirmPassword'
            value={confirmPassword}
            secureTextEntry
            onChangeText={setConfirmPassword}
            isThereError={errorConfirmPassword}
            autoCapitalize='none'
        />
      </ScrollView>
      <RegisterButton
        label="SIGUIENTE"
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
    containerForm: {
        flex: 2,
        width: '100%',
    },
    title: {
      marginTop: 15,
      marginBottom: 10,
      fontSize: 30,
      fontWeight: 'bold',
      color: globalColors.principalColor
    },
    containerButton: {
        marginBottom: 30,
        height: Dimensions.get('window').width * 0.12,
        width: '100%',
        backgroundColor: globalColors.principalColor,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: Dimensions.get('window').width * 0.8
    },
    textButton: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold' 
    }
})

export default SignupScreen
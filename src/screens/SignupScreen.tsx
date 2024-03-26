import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'

import InputSignup from '../components/InputSignup'
import Spacer from '../components/common/Spacer'
import { RootStackParams } from '../navigation/PrincipalStackNavigation'

import { globalColors } from '../styles/globalVariables'
import RegisterButton from '../components/common/RegisterButton'

type LoginScreenNavigationProp = StackNavigationProp<RootStackParams, 'SignupScreen'>
const SignupScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <View style={styles.containerForm}>
        <InputSignup 
            label="Nombre (s)"
            name='name'
            value=''
            onChangeText={() => {}}
        />
        <Spacer/>
        <InputSignup 
            label="Apellido (s)"
            name='lastname'
            value=''
            onChangeText={() => {}}
        />
        <Spacer/>
        <InputSignup 
            label="Correo electronico"
            name='email'
            value=''
            onChangeText={() => {}}
        />
        <Spacer/>
        <InputSignup 
            label="Contraseña"
            name='password'
            value=''
            secureTextEntry
            onChangeText={() => {}}
        />
        <Spacer/>
        <InputSignup 
            label="Confirmar contraseña"
            name='confirmPassword'
            value=''
            secureTextEntry
            onChangeText={() => {}}
        />
      </View>
      <RegisterButton
        label="SIGUIENTE"
        onPress={() => navigation.navigate('FiscalScreen')}
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
import { useContext } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

import { RootStackParams } from '../navigation/PrincipalStackNavigation';

import InputLogin from '../components/InputLogin'
import Spacer from '../components/common/Spacer';

import { globalColors } from '../styles/globalVariables'

import { useForm } from '../hooks/useForm';
import { useLogin } from '../hooks/useLogin';

import { Context as AuthContext} from '../context/AuthContext'
import ErrorAlert from '../components/common/ErrorAlert';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParams, 'LoginScreen'>

const LoginScreen = () => {

  const navigation = useNavigation<LoginScreenNavigationProp>()

  const {state, signin} = useContext(AuthContext)

  const {email, password, form, onChange} = useForm({
    email: '',
    password: '',
  })

  const {errorEmail, errorPassword, isValid ,validateInput} = useLogin({email,password});

  const onSubmit = () => {
    validateInput();
    if (isValid.current) {
      signin(form)
    }
  }

  return (
    <View style={styles.container}>
        <View style={styles.containerLogo}>
            <Image
              source={require('../../assets/Logo.png')}
              style={styles.imageLogo}
            />
            <Text style={styles.textCompany}>MasterGas23</Text>
        </View>
        <View style={styles.formContainer}>
            <Text style={styles.titleForm}>Iniciar Sesion</Text>

            <Spacer/>
            <InputLogin 
              label="Correo electrónico"
              name='email'
              text={email}
              onChangeText={onChange}
              autoCapitalize='none'
              isThereError={errorEmail}
            />
            <Spacer/>
            <InputLogin 
              label="Contraseña"
              name='password'
              secureTextEntry
              text={password}
              onChangeText={onChange}
              autoCapitalize='none'
              isThereError={errorPassword}
            />

            {
                state.errorMessage 
                ? <View style={{width: '80%', marginTop: 10}}>
                    <ErrorAlert
                        errorMessage={state.errorMessage}
                    />
                  </View> 
                : null
            }

            <TouchableOpacity
              style={{...styles.button, marginTop: state.errorMessage ? 10 : '5%'}}
              onPress={onSubmit}
            >
              <Text style={styles.textButton}>INICIAR SESIÓN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonSignUp}
              onPress={() => navigation.navigate('SignupScreen')}
            >
                <Text
                  style={styles.textButtonSignUp}
                >
                  REGISTRAR
                </Text>
            </TouchableOpacity>
            <Spacer/>

            <TouchableOpacity
              style={styles.restorePasswordButton}
            >
              <Text style={styles.retorePasswordButtonText}>
                Recuperar contraseña
              </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerLogo: {
    flex:1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageLogo: {
    width: "45%",
    resizeMode: "stretch",
    height: "70%"
  },
  textCompany: {
    marginTop: 15,
    fontSize: 25,
    fontWeight: 'bold',
    color: globalColors.principalColor
  },
  formContainer: {
    flex:2,
    alignItems: 'center',
    backgroundColor: globalColors.principalColor,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 40,
  },
  titleForm: {
    color: "#fff",
    fontSize: 30,
    fontWeight: 'bold'
  },
  button: {
    width: '80%',
    marginTop: "5%",
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: globalColors.thirdColor
  },
  textButton: {
    fontSize: Dimensions.get('window').width * 0.04,
    color: globalColors.principalColor,
    fontWeight: 'bold'
  },
  buttonSignUp: {
    marginTop: "5%",
  },
  textButtonSignUp: {
    fontSize: Dimensions.get('window').width * 0.06,
    color: globalColors.thirdColor
  },
  restorePasswordButton: {
    borderBottomWidth: 2,
    borderColor: 'white',
  },
  retorePasswordButtonText: {
    color: 'white',
    fontSize: Dimensions.get('window').width * 0.04
  }
})

export default LoginScreen
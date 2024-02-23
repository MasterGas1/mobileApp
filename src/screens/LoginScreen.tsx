import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

import { globalColors } from '../styles/globalVariables'
import InputLogin from '../components/InputLogin'
import Spacer from '../components/common/Spacer';

const LoginScreen = () => {

  const [requestLogin, setRequestLogin] = useState({
    email: '',
    password: ''
  })

  const onSubmit = () => {
    console.log(requestLogin)
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
              text={requestLogin.email}
              onChangeText={setRequestLogin}
            />
            <Spacer/>
            <InputLogin 
              label="Contraseña"
              name='password'
              secureTextEntry
              text={requestLogin.password}
              onChangeText={setRequestLogin}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={onSubmit}
            >
              <Text style={styles.textButton}>INICIAR SESIÓN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonSignUp}
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
    width: "50%",
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
    marginTop: "10%",
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: globalColors.thirdColor
  },
  textButton: {
    fontSize: 20,
    color: globalColors.principalColor,
    fontWeight: 'bold'
  },
  buttonSignUp: {
    marginTop: 30
  },
  textButtonSignUp: {
    fontSize: 25,
    color: globalColors.thirdColor
  },
  restorePasswordButton: {
    borderBottomWidth: 2,
    borderColor: 'white',
  },
  retorePasswordButtonText: {
    color: 'white',
    fontSize: 20
  }
})

export default LoginScreen
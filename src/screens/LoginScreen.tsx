import {useContext, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {RootStackParams} from '../navigation/PrincipalStackNavigation';

import Spacer from '../components/common/Spacer';
import {TextInput} from '../components/common/index';
import ErrorAlert from '../components/common/ErrorAlert';

import {globalColors} from '../styles/globalVariables';

import {useForm} from '../hooks/useForm';
import {useLogin} from '../hooks/useLogin';

import {Context as AuthContext} from '../context/AuthContext';
import {relativeFontSize} from '../helper/relativeFontSize';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'LoginScreen'
>;

const {height} = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const {
    state: {errorMessage},
    signin,
    clearErrorMessage,
  } = useContext(AuthContext);

  useEffect(() => {
    if (errorMessage && errorMessage.screen === 'signin') {
      Alert.alert('Error', errorMessage.message);
      clearErrorMessage();
    }
  }, [errorMessage]);

  const {email, password, errors, touched, onChange, handleSubmit} = useForm(
    {
      email: '',
      password: '',
    },
    {
      email: {
        errorMessage: 'El correo debe ser valido',
        regexValidation:
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      },
      password: {
        errorMessage: 'La contraseña debe ser igual o mayor a 8 caracteres',
        regexValidation: /^(.{8,})$/,
      },
    },
    signin,
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.containerLogo}>
        <Image
          source={require('../../assets/Logo.png')}
          style={styles.imageLogo}
        />
        <Text style={styles.textCompany}>MasterGas23</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.titleForm}>Iniciar Sesion</Text>

        <Spacer />
        <TextInput
          label="Correo Electronico"
          value={email}
          onChangeText={value => {
            onChange(value, 'email');
          }}
          errorMessage={errors.email}
          autoCapitalize="none"
          keyboardType="email-address"
          touched={touched['email']}
        />

        <Spacer />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={value => {
            onChange(value, 'password');
          }}
          secureTextEntry
          errorMessage={errors.password}
          touched={touched['password']}
        />

        <TouchableOpacity style={{...styles.button}} onPress={handleSubmit}>
          <Text style={styles.textButton}>INICIAR SESIÓN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSignUp}
          onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.textButtonSignUp}>REGISTRAR</Text>
        </TouchableOpacity>
        <Spacer />

        <TouchableOpacity style={styles.restorePasswordButton}>
          <Text style={styles.retorePasswordButtonText}>
            Recuperar contraseña
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: height * 0.06,
  },
  containerLogo: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo: {
    width: '100%',
    resizeMode: 'contain',
    height: '60%',
  },
  textCompany: {
    marginTop: 15,
    fontSize: relativeFontSize(24),
    fontWeight: 'bold',
    color: globalColors.principalColor,
  },
  formContainer: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: globalColors.principalColor,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  titleForm: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    marginTop: '5%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: globalColors.thirdColor,
  },
  textButton: {
    fontSize: Dimensions.get('window').width * 0.04,
    color: globalColors.principalColor,
    fontWeight: 'bold',
  },
  buttonSignUp: {
    marginTop: '5%',
  },
  textButtonSignUp: {
    fontSize: Dimensions.get('window').width * 0.06,
    color: globalColors.thirdColor,
  },
  restorePasswordButton: {
    borderBottomWidth: 2,
    borderColor: 'white',
  },
  retorePasswordButtonText: {
    color: 'white',
    fontSize: Dimensions.get('window').width * 0.04,
  },
});

export default LoginScreen;

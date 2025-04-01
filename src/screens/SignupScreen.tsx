import {useEffect, useState, useContext} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

import Spacer from '../components/common/Spacer';
import {Button, TextInput} from '../components/common';

import {RootStackParams} from '../navigation/PrincipalStackNavigation';

import {globalColors} from '../styles/globalVariables';

import {useForm} from '../hooks/useForm';

import dbApi from '../api/DbApi';
import {ErrorResponseInterface} from '../interface/errorResponse';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParams,
  'SignupScreen'
>;
const SignupScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(
    'Las contraseñas no coinciden',
  );
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const initialValues = {
    name: '',
    lastName: '',
    email: '',
    password: '',
  };

  const validations = {
    name: {
      errorMessage: 'El nombre debe ser igual o mayor a 3 caracteres',
      regexValidation: /^(.{3,})$/,
    },
    lastName: {
      errorMessage: 'El apellido ser igual o mayor a 3 caracteres',
      regexValidation: /^(.{3,})$/,
    },
    email: {
      errorMessage: 'El correo debe ser valido',
      regexValidation:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },
    password: {
      errorMessage:
        'Contraseña debe tener al menos 8 caracteres, una mayuscula, un número y un caracter especial',
      regexValidation: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    },
  };

  const onSubmit = async (values: {
    name: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    if (errorConfirmPassword) {
      setConfirmPasswordTouched(true);
    } else {
      try {
        await dbApi.post('/user/validateEmail', {
          email: values.email,
          roleName: 'Customer',
        });
        navigation.navigate('FiscalScreen', {form: values});
      } catch (error) {
        if (axios.isAxiosError<ErrorResponseInterface>(error)) {
          Alert.alert('Error', error.response?.data.message);
        } else {
          console.log(error);
        }
      }
    }
  };

  const {
    name,
    lastName,
    email,
    password,
    errors,
    touched,
    onChange,
    handleSubmit,
  } = useForm(initialValues, validations, onSubmit);

  const validateConfirmPassword = (value: string) => {
    if (password !== value) {
      setErrorConfirmPassword('Las contraseñas no coinciden');
    } else {
      setErrorConfirmPassword('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <ScrollView style={styles.containerForm}>
        <KeyboardAvoidingView>
          <TextInput
            label="Nombre (s)"
            value={name}
            onChangeText={value => onChange(value, 'name')}
            variant="outlined"
            errorMessage={errors['name']}
            touched={touched['name']}
          />
          <Spacer />
          <TextInput
            label="Apellido (s)"
            value={lastName}
            onChangeText={value => onChange(value, 'lastName')}
            variant="outlined"
            errorMessage={errors['lastName']}
            touched={touched['lastName']}
          />
          <Spacer />
          <TextInput
            label="Correo electrónico"
            value={email}
            onChangeText={value => onChange(value, 'email')}
            variant="outlined"
            autoCapitalize="none"
            keyboardType="email-address"
            errorMessage={errors['email']}
            touched={touched['email']}
          />
          <Spacer />
          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={value => onChange(value, 'password')}
            variant="outlined"
            secureTextEntry
            errorMessage={errors['password']}
            touched={touched['password']}
          />
          <Spacer />
          <TextInput
            label="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={value => {
              setConfirmPassword(value);
              validateConfirmPassword(value);
            }}
            variant="outlined"
            secureTextEntry
            errorMessage={errorConfirmPassword}
            touched={confirmPasswordTouched}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <Button
        text="SIGUIENTE"
        onPress={handleSubmit}
        styleContainer={{
          width: '90%',
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  containerForm: {
    flex: 2,
    width: '90%',
  },
  title: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: globalColors.principalColor,
  },
  containerButton: {
    marginBottom: 30,
    height: Dimensions.get('window').width * 0.12,
    width: '100%',
    backgroundColor: globalColors.principalColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: Dimensions.get('window').width * 0.8,
  },
  textButton: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default SignupScreen;

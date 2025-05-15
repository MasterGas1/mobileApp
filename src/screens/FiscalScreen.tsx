import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {globalColors} from '../styles/globalVariables';
import Spacer from '../components/common/Spacer';
import LoadingModal from '../components/common/LoadingModal';

import {Context as AuthContext} from '../context/AuthContext';
import {useForm} from '../hooks/useForm';
import {RootStackParams} from '../navigation/PrincipalStackNavigation';
import {Button, TextInput} from '../components/common';

interface Props extends StackScreenProps<RootStackParams, 'FiscalScreen'> {}

const FiscalScreen = ({route, navigation}: Props) => {
  const {
    signup,
    clearErrorMessage,
    state: {errorMessage, loading},
  } = useContext(AuthContext);
  const {form} = route.params;
  const initialValues = {
    rfc: '',
    taxResidence: '',
  };

  const validations = {
    rfc: {
      errorMessage: 'El RFC debe ser de 13 o 12 caracteres',
      regexValidation: /^(.{12,13})$/,
    },
    taxResidence: {
      errorMessage: 'La residencia fiscal es requerida',
      regexValidation: /^(.{1,})$/,
    },
  };

  const onSubmit = (values: {rfc: string; taxResidence: string}) => {
    signup({
      ...form,
      rfc: values.rfc,
      taxResidence: values.taxResidence,
    });
  };

  const {rfc, taxResidence, errors, touched, onChange, handleSubmit} = useForm(
    initialValues,
    validations,
    onSubmit,
  );

  useEffect(() => {
    if (errorMessage && errorMessage.screen === 'signup') {
      Alert.alert('Error', errorMessage.message);
      clearErrorMessage();
    }
  }, [errorMessage]);

  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingModal />}
      <Text style={styles.title}>Datos Fiscales</Text>

      <View style={styles.containerForm}>
        <TextInput
          label="RFC"
          value={rfc}
          onChangeText={value => onChange(value, 'rfc')}
          variant="outlined"
          errorMessage={errors['rfc']}
          autoCapitalize="characters"
          touched={touched['rfc']}
          maxLength={13}
        />
        <Spacer />
        <TextInput
          label="Residencia Fiscal"
          value={taxResidence}
          onChangeText={value => onChange(value, 'taxResidence')}
          variant="outlined"
          errorMessage={errors['taxResidence']}
          touched={touched['taxResidence']}
        />
      </View>
      <Button
        text="REGISTRAR"
        styleContainer={{
          width: '90%',
        }}
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
  },
  title: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: globalColors.principalColor,
  },
  containerForm: {
    flex: 2,
    width: '90%',
  },
});

export default FiscalScreen;

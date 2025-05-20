import React, {useContext, useEffect, useRef, useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
  Alert,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {globalColors} from '../../styles/globalVariables';

import CustomInput from '../common/CustomInput';
import {Button} from '../common';

import {useForm} from '../../hooks/useForm';

import {Context as AddressContext} from '../../context/AddressContext';

export interface ModalAddressProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ModalAddress = ({isOpen, setIsOpen}: ModalAddressProps) => {
  const {
    state: {errorMessage, success},
    addAddress,
    clearErrorMessage,
  } = useContext(AddressContext);

  const initialValue = {
    name: '',
    addressName: '',
  };

  const validations = {
    name: {
      errorMessage: 'El nombre es requerido',
      regexValidation: /^(.{1,})$/,
    },
    addressName: {
      errorMessage: 'La dirección es requerida',
      regexValidation: /^(.{1,})$/,
    },
  };

  const onSubmit = (values: {name: string; addressName: string}) => {
    addAddress({
      name: values.name,
      addressName: values.addressName,
      coordinates: {
        latitude: ref.current.latitude,
        longitude: ref.current.longitude,
      },
    });
  };

  const {name, errors, onChange, resetForm, handleSubmit} = useForm(
    initialValue,
    validations,
    onSubmit,
  );

  const ref = useRef({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (errorMessage) {
      Alert.alert(errorMessage);
    }
    if (success) {
      setIsOpen(false);
      resetForm();
    }

    clearErrorMessage();
  }, [errorMessage]);

  return (
    <Modal animationType="slide" transparent={true} visible={isOpen}>
      <View style={styles.centerView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
            }}
            onPress={() => {
              setIsOpen(false);
              resetForm();
            }}>
            <Icon
              name="close-outline"
              size={30}
              color={globalColors.principalColor}
              style={{marginBottom: 10, fontWeight: 'bold'}}
            />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Agregar Dirección</Text>

          <CustomInput
            name="name"
            placeholder="Nombre (Casa, Gasolinera, etc.)"
            onChangeText={onChange}
            value={name}
            error={errors.name}
          />

          <GooglePlacesAutocomplete
            placeholder="Dirección"
            fetchDetails
            onPress={(data, details) => {
              if (details) {
                const {lat, lng} = details.geometry.location;

                onChange(details.formatted_address, 'addressName');

                ref.current = {
                  latitude: lat,
                  longitude: lng,
                };
              }
            }}
            query={{
              key: 'AIzaSyBnYn-5NlhuQnRUugaQOVS4t1nsKeo0toA',
              language: 'es',
            }}
            styles={{
              container: {
                width: '100%',
              },
              textInput: {
                borderColor: errors.addressName
                  ? globalColors.dangerColor
                  : '#ccc',
                borderWidth: 1,
                height: Dimensions.get('window').height * 0.06,
                fontSize: Dimensions.get('window').width * 0.035,
                borderRadius: 10,
              },
            }}
            textInputProps={{
              placeholderTextColor: errors.addressName
                ? globalColors.dangerColor
                : globalColors.secondaryColor,
            }}
          />

          <Button text="Agregar" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: globalColors.backgroundColor,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '55%',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: globalColors.principalColor,
  },
});

export default ModalAddress;

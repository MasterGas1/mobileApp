import React, {FC, useContext, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import {globalColors} from '../../styles/globalVariables';

import CustomInput from '../common/CustomInput';

import {useForm} from '../../hooks/useForm';

import {AddressResponseInterface} from '../../interface/addressInterface';
import {Button} from '../common';
import Spacer from '../common/Spacer';

import {Context as AddressContext} from '../../context/AddressContext';

interface ModalEditAddressProps {
  isOpen: boolean;
  address: AddressResponseInterface;
  setIsOpen: (value: boolean) => void;
}

const ModallEditAddress: FC<ModalEditAddressProps> = ({
  isOpen,
  address,
  setIsOpen,
}) => {
  const {
    state: {errorMessage, success},
    clearErrorMessage,
    updateAddress,
    deleteAddress,
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
    updateAddress(address._id, {
      name: values.name,
      addressName: values.addressName,
      coordinates: {
        latitude: ref.current.latitude,
        longitude: ref.current.longitude,
      },
    });
  };

  const {
    name,
    addressName,
    errors,
    onChange,
    resetForm,
    handleSubmit,
    updateValues,
  } = useForm(initialValue, validations, onSubmit);

  const ref = useRef({
    latitude: 0,
    longitude: 0,
  });

  const deleteAddressAction = () => {
    Alert.alert(
      'Eliminar Dirección',
      '¿Estás seguro de eliminar esta dirección?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Si',
          style: 'destructive',
          onPress: () => {
            deleteAddress(address._id);
          },
        },
      ],
    );
  };

  useEffect(() => {
    if (address) {
      updateValues({
        name: address.name,
        addressName: address.addressName,
      });
    }
  }, [address]);

  useEffect(() => {
    if (success) {
      setIsOpen(false);
      resetForm();
    }

    clearErrorMessage();
  }, [errorMessage, success]);

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
            }}>
            <Icon
              name="close-outline"
              size={30}
              color={globalColors.principalColor}
              style={{marginBottom: 10, fontWeight: 'bold'}}
            />
          </TouchableOpacity>

          <Text style={styles.textTitle}>Editar Dirección</Text>

          <CustomInput
            name="name"
            placeholder="Nombre (Casa, Gasolinera, etc.)"
            onChangeText={onChange}
            value={name}
            error={errors.name}
          />

          <GooglePlacesAutocomplete
            placeholder={addressName}
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

          <Button
            text="Guardar"
            onPress={handleSubmit}
            styleContainer={{height: 40}}
          />

          <Spacer height={20} />

          <TouchableOpacity onPress={deleteAddressAction}>
            <Text style={styles.textDelete}>Eliminar</Text>
          </TouchableOpacity>
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
    paddingTop: 35,
    paddingHorizontal: 35,
    paddingBottom: 10,
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
  textDelete: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: globalColors.dangerColor,
  },
});

export default ModallEditAddress;

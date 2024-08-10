import React, { useContext, useEffect, useRef, useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import { globalColors } from '../styles/globalVariables'

import PrincipalButton from './common/PrincipalButton'
import CustomInput from './common/CustomInput';

import { useForm } from '../hooks/useForm';

import { Context as AddressContext } from '../context/AddressContext';

export interface ModalAddressProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
}

const ModalAddress = ({isOpen, setIsOpen}: ModalAddressProps) => {

    const { addAddress } = useContext(AddressContext)

    const {name, addressName, form, onChange} = useForm({
        name: '',
        addressName: '',
        coords: {
            latitude: 0,
            longitude: 0
        }
    })

    const [errorName, setErrorName] = useState('')
    const [errorAddress, setErrorAddress] = useState('')


    const ref = useRef({
        latitude: 0,
        longitude: 0
    })

    useEffect(() => {
        if(addressName !== '') {
            onChange({
                latitude: ref.current.latitude,
                longitude: ref.current.longitude
            },'coords')
        } else {
            onChange({latitude: 0, longitude: 0},'coords')
        }
    },[addressName])


    useEffect(() => {
        if(isOpen) {
            onChange('', 'addressName')
            setErrorName('')
            setErrorAddress('')
        }
    },[isOpen])

    useEffect(() => {
        if(addressName === '') {
            onChange('','name')
        }
    },[addressName])

    useEffect(() => {
        if(name === '') {
            setErrorName('El nombre es requerido')

        }
    },[name])


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
    >
        <View
            style={styles.centerView}
        >
            <View
                style={styles.modalView}
            >

                <TouchableOpacity 
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                    }}
                    onPress={() => {
                        setIsOpen(false)
                        setErrorName('')
                        setErrorAddress('')
                        onChange('', 'name')

                    }}
                >
                    <Icon 
                        name="close-outline"
                        size={30}
                        color={globalColors.principalColor}
                        style={{marginBottom: 10, fontWeight: 'bold'}}
                    />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Agregar Dirección</Text>

                <CustomInput
                    name='name'
                    placeholder='Nombre (Casa, Gasolinera, etc.)'
                    onChangeText={onChange}
                    value={name}
                    error={errorName}
                />

                <GooglePlacesAutocomplete
                    placeholder='Dirección'
                    fetchDetails
                    onPress={(data,details) => {
                        if (details) {
                            const {lat, lng} = details.geometry.location
                            
                            onChange(details.formatted_address, 'addressName')

                            ref.current = {
                                latitude: lat,
                                longitude: lng
                            }
                        }
                    }}
                    query={{
                        key: 'AIzaSyBnYn-5NlhuQnRUugaQOVS4t1nsKeo0toA',
                        language: 'es'
                    }}
                    styles={{
                        container: {
                            width: '100%',
                        },
                        textInput: {
                            borderColor: errorAddress ? globalColors.dangerColor : "#ccc",
                            borderWidth: 1,
                            height: Dimensions.get('window').height * 0.06,
                            fontSize: Dimensions.get('window').width * 0.035,
                            borderRadius: 10
                        },
                    }}
                    textInputProps={{
                        placeholderTextColor: errorAddress ? globalColors.dangerColor : globalColors.secondaryColor
                    }}
                    
                />

                <PrincipalButton
                    label='Agregar'
                    onPress={() => {
                        if (name === '' ) {
                            setErrorName('Por favor ingrese un nombre')
                        }

                        if (addressName === '') {
                            setErrorAddress('Por favor ingrese una dirección')
                        }

                        if (name !== '' && addressName !== '') {
                            addAddress(form)
                        }
                    }}
                />
            </View>
        </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
    centerView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        backgroundColor: globalColors.backgroundColor,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: '55%'
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: globalColors.principalColor
    }
})

export default ModalAddress
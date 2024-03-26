import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

import InputSignup from '../components/InputSignup'

import { globalColors } from '../styles/globalVariables'
import Spacer from '../components/common/Spacer'
import RegisterButton from '../components/common/RegisterButton'
import { TouchableOpacity } from 'react-native-gesture-handler'

const FiscalScreen = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Datos Fiscales</Text>
        
        <View style={styles.containerForm}>
            <InputSignup 
                label="RFC"
                name='RFC'
                value=''
                onChangeText={() => {}}
            />
            <Spacer/>
            <InputSignup
                label="Domicilio Fiscal"
                name='fiscalAddress'
                value=''
                onChangeText={() => {}}
            />
        </View>
        <RegisterButton 
            label="REGISTRAR"
            onPress={() => console.log('hola')}
        />
        <Spacer/>
        <TouchableOpacity style={styles.buttonSkipContainer}>
            <Text style={styles.textButtonSkip}>Saltar</Text>
        </TouchableOpacity>
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
    title: {
        marginTop: 15,
        marginBottom: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: globalColors.principalColor
    },
    containerForm: {
        flex: 2,
        width: '100%',
    },
    buttonSkipContainer: {
        marginBottom: 30,
        minWidth: Dimensions.get('window').width * 0.12,
        backgroundColor: globalColors.thirdColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButtonSkip: {
        color: globalColors.principalColor,
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default FiscalScreen
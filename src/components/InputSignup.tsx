import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import { globalColors } from '../styles/globalVariables'

interface InputSignupProps {
    label: string,
    name: string,
    secureTextEntry?: boolean,
    value: string,
    onChangeText: Function,
    isThereError?: string,
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
}

const InputSignup = ({label,value, secureTextEntry, onChangeText, name, isThereError, autoCapitalize}: InputSignupProps) => {

  return (
      <View style={styles.container}>
        <Text style={styles.title}>{label}</Text>
        <TextInput
            style={{...styles.containerInput, borderColor: isThereError ? globalColors.dangerColor : globalColors.secondaryColor}}
            value={value}
            secureTextEntry={secureTextEntry}
            onChange={value => onChangeText(value.nativeEvent.text,name)}
            autoCapitalize={autoCapitalize}
        />
        <Text style={styles.errorText}>{isThereError}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    title: {
        color: '#52525B',
        fontWeight: '500',
        fontSize: Dimensions.get('window').width * 0.04
    },
    containerInput: {
        padding: 10,
        backgroundColor: globalColors.thirdColor,
        borderWidth: 1,
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 50,
        justifyContent: 'center',
        fontWeight: '500',
        fontSize: Dimensions.get('window').width * 0.04
    },
    errorContainer: {
        borderColor: globalColors.dangerColor
    },
    errorText: {
        color: globalColors.dangerColor,
        fontSize: Dimensions.get('window').width * 0.04
    }
})

export default InputSignup
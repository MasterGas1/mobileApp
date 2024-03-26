import React from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import { globalColors } from '../styles/globalVariables'

interface InputSignupProps {
    label: string,
    name: string,
    secureTextEntry?: boolean,
    value: string,
    onChangeText: Function
}

const InputSignup = ({label,value, secureTextEntry}: InputSignupProps) => {
  return (
      <View style={styles.container}>
        <Text style={styles.title}>{label}</Text>
        <TextInput
            style={styles.containerInput}
            value={value}
            secureTextEntry={secureTextEntry}
        />
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
        borderColor: globalColors.secondaryColor,
        borderWidth: 1,
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 50,
        justifyContent: 'center',
        fontWeight: '500'
    }
})

export default InputSignup
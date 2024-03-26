import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'

import { globalColors } from '../../styles/globalVariables'

interface RegisterButtonProps {
    label: string,
    onPress: Function
}
const RegisterButton = ({label, onPress}: RegisterButtonProps) => {
  return (
    <TouchableOpacity 
        style={styles.containerButton}
        onPress={() => onPress()}
        >
        <Text style={styles.textButton}>{label}</Text>
    </TouchableOpacity>    
  )
}

const styles = StyleSheet.create({
    containerButton: {
        height: Dimensions.get('window').width * 0.12,
        width: '100%',
        backgroundColor: globalColors.principalColor,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: Dimensions.get('window').width * 0.8
    },
    textButton: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold' 
    }
})

export default RegisterButton
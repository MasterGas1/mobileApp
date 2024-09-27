import React from 'react'
import { Dimensions, StyleSheet, TextInput, View } from 'react-native'
import { globalColors } from '../../styles/globalVariables'

export interface CustomInputProps {
    placeholder: string
    value: string
    name: string
    onChangeText: Function
    error: string
}

const CustomInput = ({placeholder, value, name, error,onChangeText}: CustomInputProps) => {
  return (
    <View
      style={styles.container}
    >
      <TextInput
          value={value}
          onChangeText={value => onChangeText(value, name)}
          placeholder={placeholder}
          style={{...styles.input, borderColor: error ? globalColors.dangerColor : "#ccc"}}
          placeholderTextColor={error ? globalColors.dangerColor : globalColors.secondaryColor}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: "13%",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    input: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        width: '100%',
        height: '100%',
        fontSize: Dimensions.get('window').width * 0.035
    }
})

export default CustomInput
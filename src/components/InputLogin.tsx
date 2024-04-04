import React, { useRef } from 'react'
import { StyleSheet, TextInput, Animated, Easing, View, Text, Dimensions } from 'react-native'
import { globalColors } from '../styles/globalVariables'


interface InputLoginProps {
    label: string,
    name: string,
    secureTextEntry?: boolean,
    text: string,
    onChangeText: Function,
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters',
    isThereError?: string
}

const InputLogin = ({label, name ,secureTextEntry, text, onChangeText, autoCapitalize, isThereError}: InputLoginProps) => {


  return (
    <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <View style={{...styles.subContainer, borderWidth: isThereError ? 1.5 : 0, borderColor: isThereError ? globalColors.dangerColor : globalColors.secondaryColor}}>
          <Text style={{...styles.textInput, color : isThereError ? globalColors.dangerColor : globalColors.principalColor}}>{label}</Text>
          <TextInput
              secureTextEntry={secureTextEntry}
              value={text}
              style={styles.textStyle}
              onChange={value => onChangeText(value.nativeEvent.text, name)}
              autoCapitalize={autoCapitalize}
          />
      </View>
      {isThereError 
        ?<Text style={styles.errorText}>{isThereError}</Text>
        : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
    subContainer: {
        padding: 10,
        backgroundColor: globalColors.secondaryColor,
        width: '80%',
        borderRadius: 10,
        paddingTop: 15,
        paddingHorizontal: 10,
        height: 60,
        justifyContent: 'center'
    },
    textStyle: {
        paddingBottom: 10,
        height: Dimensions.get('window').height * 0.045,
        fontSize: Dimensions.get('window').width * 0.04
    },
    textInput: {
        color: globalColors.principalColor,
        fontSize: Dimensions.get('window').width * 0.04,
        fontWeight: '500'
    },
    errorText: {
        color: globalColors.dangerColor,
        fontSize: Dimensions.get('window').width * 0.04,
        fontWeight: '600',
        textAlign: 'left',
        width: '80%'
    }
})

export default InputLogin
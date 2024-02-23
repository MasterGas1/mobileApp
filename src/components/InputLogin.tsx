import React, { useRef } from 'react'
import { StyleSheet, TextInput, Animated, Easing } from 'react-native'
import { globalColors } from '../styles/globalVariables'


interface InputLoginProps {
    label: string,
    name: string,
    secureTextEntry?: boolean,
    text: string,
    onChangeText: Function
}

const InputLogin = ({label, name ,secureTextEntry, text, onChangeText}: InputLoginProps) => {

    const animatedValue = useRef(new Animated.Value(0))

    const floatingTextInput = {
        titleActivateSize: 14,
        titleInActiveSize: 18,
        titleActivateColor: globalColors.principalColor,
        titleInactiveColor: globalColors.principalColor
    }

    const viewStyles = {
        borderBottomColor: animatedValue?.current?.interpolate({
          inputRange: [0, 1],
          outputRange: [floatingTextInput.titleInactiveColor, floatingTextInput.titleActivateColor],
        }),
        borderBottomWidth: 0.8,
      }

    const onFocus = () => {
        Animated.timing(animatedValue.current, {
            toValue: 1,
            duration: 500,
            easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            useNativeDriver: false
        }).start()
    }

    const onBlur = () => {
        if (text === '') {
            Animated.timing(animatedValue.current, {
                toValue: 0,
                duration: 500,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1),
                useNativeDriver: false
            }).start()
        }
    }

    const AnimatedTitleStyles = {
        transform: [
            {
              translateY: animatedValue?.current?.interpolate({
                inputRange: [0, 1],
                outputRange: [22, -4],
                extrapolate: 'clamp',
              }),
            },
          ],
          fontSize: animatedValue?.current?.interpolate({
            inputRange: [0, 1],
            outputRange: [floatingTextInput.titleInActiveSize, floatingTextInput.titleActivateSize],
            extrapolate: 'clamp',
          }),
          color: animatedValue?.current?.interpolate({
            inputRange: [0, 1],
            outputRange: [floatingTextInput.titleInactiveColor, floatingTextInput.titleActivateColor],
          }),
    }

    const onChangeHandler = (value: any) => {
        onChangeText((prevState:any) => ({...prevState, [name]: value}))
    }

  return (
    <Animated.View style={[styles.subContainer, viewStyles]}>
        <Animated.Text style={[AnimatedTitleStyles, {fontWeight: '500'}]}>{label}</Animated.Text>
        <TextInput
            secureTextEntry={secureTextEntry}
            value={text}
            style={styles.textStyle}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={(e) => onChangeHandler(e.nativeEvent.text)}
        />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    subContainer: {
        padding: 10,
        backgroundColor: globalColors.secondaryColor,
        width: '80%',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 60,
        justifyContent: 'center'
    },

    textStyle: {
        paddingBottom: 10,
        fontSize: 20,
    }
})

export default InputLogin
import React, {ComponentProps, useEffect, useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  TextInput as RNTextInput,
  Pressable,
  Dimensions,
  View,
  Text,
} from 'react-native';

import {globalColors} from '../../styles/globalVariables';

import {relativeFontSize} from '../../helper/relativeFontSize';

interface TextInputProps extends ComponentProps<typeof RNTextInput> {
  label: string;
  value: string;
  touched?: boolean;
  variant?: 'contained' | 'outlined';
  errorMessage?: string | null;
  onChangeText: (text: string) => void;
}

const {height} = Dimensions.get('window');

const TextInput = ({
  label,
  value,
  touched,
  errorMessage,
  variant = 'contained',
  onChangeText,
  ...props
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;
  const inputRef = useRef<RNTextInput>(null);

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || value ? 0.5 : -0.2,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [14, -9],
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [relativeFontSize(15), 12],
    }),
    color: isFocused
      ? globalColors.secondaryColor
      : globalColors.principalColor,
  };

  return (
    <View
      style={{
        width: '100%',
      }}>
      <Pressable
        style={[
          styles.container,
          variant === 'outlined' && styles.outlinedContainer,
        ]}
        onPress={() => inputRef.current?.focus()}>
        <Animated.Text style={[styles.label, labelStyle]}>
          {label}
        </Animated.Text>
        <RNTextInput
          ref={inputRef}
          style={[
            styles.input,
            {
              borderColor: isFocused
                ? globalColors.principalColor
                : globalColors.secondaryColor,
            },
          ]}
          value={value}
          onChange={e => onChangeText(e.nativeEvent.text)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </Pressable>

      {errorMessage && touched && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    position: 'relative',
    width: '100%',
    height: height * (height < 700 ? 0.08 : 0.07),
    borderRadius: 10,
    justifyContent: 'flex-end',
    backgroundColor: '#D9D9D9',
  },
  outlinedContainer: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: globalColors.secondaryColor,
  },
  label: {
    top: '50%',
    left: 5,
    position: 'absolute',
    backgroundColor: 'transparent',
    paddingHorizontal: 5,
    zIndex: 1,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    height: '80%',
    color: '#495057',
  },
  errorText: {
    color: globalColors.dangerColor,
    fontSize: relativeFontSize(13),
  },
});

export default TextInput;

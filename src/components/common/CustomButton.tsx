import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Text,
} from 'react-native';

import {globalColors} from '../../styles/globalVariables';

import {ButtonType} from '../../interface/ButtonType.enum';

interface CustomButtonProps {
  text: string;
  type: ButtonType;
  styleContainer: StyleProp<ViewStyle>;
  onPress: () => void;
}

const CustomButton = ({
  text,
  type,
  styleContainer,
  onPress,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: globalColors[type],
        },
        styles.buttonContainer,
        styleContainer,
      ]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default CustomButton;

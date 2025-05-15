import React, {ComponentProps, FC} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {globalColors} from '../../styles/globalVariables';
import {relativeFontSize} from '../../helper/relativeFontSize';

interface ButtonProps extends ComponentProps<typeof TouchableOpacity> {
  text: string;
  styleContainer?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  loading?: boolean;
  onPress: () => void;
}

const {height} = Dimensions.get('window');

const Button: FC<ButtonProps> = ({
  text,
  styleContainer,
  styleText,
  loading,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, styleContainer]}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator size={'small'} color={globalColors.principalColor} />
      ) : (
        <Text style={[styles.text, styleText]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalColors.principalColor,
    width: '100%',
    height: height < 700 ? height * 0.08 : height * 0.06,
  },
  text: {
    color: 'white',
    fontSize: relativeFontSize(17),
    fontWeight: 'bold',
  },
});

export default Button;

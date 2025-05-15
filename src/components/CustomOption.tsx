import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {globalColors} from '../styles/globalVariables';
import {relativeFontSize} from '../helper/relativeFontSize';

interface OptionProps {
  icon: string;
  text: string;
  onPress: () => void;
}

const CustomOption = ({icon, text, onPress}: OptionProps) => {
  return (
    <TouchableOpacity style={styles.optionContainer} onPress={() => onPress()}>
      <View style={styles.optionIcon}>
        <Ionicons name={icon} size={25} color={'white'} />
      </View>
      <Text style={styles.optionText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    alignSelf: 'flex-start',
  },
  optionText: {
    marginLeft: 10,
    fontSize: relativeFontSize(17),
    color: '#004d40',
  },
  optionIcon: {
    backgroundColor: globalColors.principalColor,
    borderRadius: 50,
    padding: 5,
    width: Dimensions.get('window').width * 0.09,
    height: Dimensions.get('window').width * 0.09,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomOption;

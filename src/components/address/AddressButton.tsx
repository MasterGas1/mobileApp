import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {globalColors} from '../../styles/globalVariables';
import {relativeFontSize} from '../../helper/relativeFontSize';

interface AddressButtonProps {
  name: string;
  addressName: string;
  isSelected: boolean;
  isCurrentLocation: boolean;
  onPress: () => void;
  onEditPress?: () => void;
}

const AddressButton = ({
  name,
  addressName,
  isSelected,
  isCurrentLocation,
  onPress,
  onEditPress,
}: AddressButtonProps) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.circleContainer}>
          {isSelected && <View style={styles.circleSelectedContainer} />}
        </View>
        <View>
          <View style={styles.textNameContainer}>
            <Text style={styles.textName}>{name}</Text>
          </View>
          <Text style={styles.textAddress} numberOfLines={2}>
            {addressName}
          </Text>
        </View>
      </TouchableOpacity>
      {!isCurrentLocation && (
        <TouchableOpacity
          style={{
            marginLeft: 10,
            marginRight: 10,
          }}
          onPress={onEditPress}>
          <Ionicons
            name="pencil-outline"
            size={25}
            color={globalColors.principalColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomColor: globalColors.secondaryColor,
    borderBottomWidth: 2,
  },
  container: {
    marginBottom: 10,
    flexDirection: 'row',
    width: '85%',
  },
  circleSelectedContainer: {
    width: 8,
    height: 8,
    borderRadius: 15,
    backgroundColor: globalColors.principalColor,
  },
  circleContainer: {
    borderWidth: 2,
    borderColor: globalColors.principalColor,
    padding: 5,
    borderRadius: 15,
    height: 23,
    width: 23,
    marginRight: 10,
  },
  textNameContainer: {
    backgroundColor: globalColors.principalColor,
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  textName: {
    color: 'white',
    fontSize: relativeFontSize(15),
    fontWeight: 'bold',
  },
  textAddress: {
    fontSize: relativeFontSize(13),
    color: globalColors.secondaryColor,
    fontWeight: 'bold',
    width: '50%',
  },
});

export default AddressButton;

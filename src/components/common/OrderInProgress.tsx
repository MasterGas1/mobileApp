import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {globalColors} from '../../styles/globalVariables';

interface OrderInProgressProps {
  onPress: () => void;
}

const OrderInProgress = ({onPress}: OrderInProgressProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ActivityIndicator size={'small'} color={'white'} />
      <Text style={styles.text}>Orden en progreso</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalColors.OrderProgressColor,
    height: 60,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: Dimensions.get('window').width * 0.045,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default OrderInProgress;

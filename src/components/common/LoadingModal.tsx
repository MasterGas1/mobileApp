import React from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';

const LoadingModal = () => {
  return (
    <View style={styles.backgroundModal}>
      <ActivityIndicator size={'large'} color={'white'} />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    width: '100%',
    height: Dimensions.get('window').height,
    zIndex: 1,
  },
});

export default LoadingModal;

import React from 'react';
import {Modal, SafeAreaView, StyleSheet, View} from 'react-native';

interface BottonModalProps {
  visible: boolean;
  children: JSX.Element[] | JSX.Element;
}

const BottonModal = ({visible, children}: BottonModalProps) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.container}>
        <SafeAreaView style={styles.modalContainer}>{children}</SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: '95%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default BottonModal;

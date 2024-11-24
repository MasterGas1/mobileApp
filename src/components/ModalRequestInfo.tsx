import React from 'react';
import {Image, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {globalColors} from '../styles/globalVariables';

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const ModalRequestInfo = ({visible, setVisible}: Props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
                style={{
                position: 'absolute',
                top: 10,
                right: 10,
                }}

                onPress={() => setVisible(false)}
            >
                <Icon
                name="close-outline"
                size={30}
                color={globalColors.principalColor}
                style={{marginBottom: 10, fontWeight: 'bold'}}
                />
          </TouchableOpacity>

          <Text style={styles.textTitle}>Información de la solicitud</Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        height: 100,
                        width: '65%',
                    }}
                >
                    <Text style={styles.textInfo}>Manuel Alejandro Barba Gonzalez</Text>
                    <Text style={styles.textInfo}>3311139787</Text>
                </View>

                <Image
                source={{uri: 'https://avatarfiles.alphacoders.com/693/thumb-1920-69306.jpg'}}
                style={{width: 120, height: 150, borderRadius: 10}}
                />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: globalColors.backgroundColor,
    width: '90%',
    height: '85%',
    borderRadius: 20,
    alignItems: 'center',
    padding: 40,
  },
  textTitle: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 20,
      color: globalColors.principalColor
  },
  textInfo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    flexWrap: 'wrap',
  }
});

export default ModalRequestInfo;

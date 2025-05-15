import React, {FC} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {globalColors} from '../../styles/globalVariables';
import {relativeFontSize} from '../../helper/relativeFontSize';
import {ServiceInterface} from '../../interface/serviceInterface';
import {Button} from '../common';

interface ServiceInformationModalProps {
  visible: boolean;
  service?: ServiceInterface;
  onChangeVisible: () => void;
  onHandleAccept: () => void;
}

const ServiceInformationModal: FC<ServiceInformationModalProps> = ({
  visible,
  service,
  onChangeVisible,
  onHandleAccept,
}) => {
  return (
    <Modal animationType="slide" visible={visible} transparent={true}>
      <SafeAreaView style={styles.safeArea}>
        <BlurView
          style={[
            StyleSheet.absoluteFill,
            {backgroundColor: 'backgroundColor: rgba(46,80,67,0.5)'},
          ]}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor={'#2e5043'}
        />
        <TouchableOpacity
          onPress={onChangeVisible}
          style={{alignSelf: 'flex-end', margin: 10}}>
          <Ionicons
            name="close-outline"
            size={relativeFontSize(30)}
            color={'white'}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <Image
            source={{uri: service?.image}}
            style={{
              width: Dimensions.get('window').width * 0.6,
              height: Dimensions.get('window').width * 0.6,
              alignSelf: 'center',
              top: Dimensions.get('window').width / 3.5,
              position: 'absolute',
              zIndex: 1,
            }}
          />
          <View style={styles.topContainer} />
          <View style={styles.bottonContainer}>
            <View
              style={{
                flex: 1,
              }}>
              <Text style={styles.titleServiceText}>{service?.name}</Text>

              <Text style={styles.descriptionServiceText}>
                {service?.description}
              </Text>
            </View>

            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: globalColors.secondaryColor,
                marginBottom: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 15,
              }}>
              <View>
                <Text style={[styles.descriptionServiceText, {marginTop: 0}]}>
                  Precio:
                </Text>
                <Text style={styles.priceServiceText}>${service?.price}</Text>
              </View>
              <Button
                onPress={onHandleAccept}
                text="Solicitar"
                styleContainer={{width: '50%', borderRadius: 30}}
                styleText={{fontWeight: '500'}}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: globalColors.backgroundColor,
    height: '20%',
    borderTopLeftRadius: 300,
  },
  bottonContainer: {
    backgroundColor: globalColors.backgroundColor,
    height: '45%',
    paddingHorizontal: 10,
  },
  titleServiceText: {
    fontSize: relativeFontSize(20),
    fontWeight: 'bold',
    color: globalColors.principalColor,
  },
  descriptionServiceText: {
    fontSize: relativeFontSize(15),
    color: globalColors.secondaryColor,
    marginTop: Dimensions.get('window').height * 0.04,
  },
  priceServiceText: {
    fontSize: relativeFontSize(20),
    color: 'black',
    fontWeight: '600',
  },
});

export default ServiceInformationModal;

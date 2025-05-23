import React, {useContext, useEffect} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomModal from './common/BottomModal';

import CustomButton from './common/CustomButton';

import {globalColors} from '../styles/globalVariables';

import {ResponseCreateRequestInterface} from '../interface/requestInterface';
import {ButtonType} from '../interface/ButtonType.enum';

import {Context as SocketContext} from '../context/SocketContext';

interface Props {
  visible: boolean;
  request?: ResponseCreateRequestInterface;
  acceptRequest: () => void;
  setVisible: (value: boolean) => void;
}

const ModalRequestInfo = ({
  visible,
  request,
  acceptRequest,
  setVisible,
}: Props) => {
  const {
    state: {socketService},
  } = useContext(SocketContext);

  return (
    <BottomModal visible={visible} height={'70%'}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: '#D3D3D3',
            borderRadius: 100,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setVisible(false)}>
          <Icon
            name="close-outline"
            size={30}
            color={'#707673'}
            style={{fontWeight: 'bold'}}
          />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              borderBottomWidth: 2,
              borderColor: globalColors.fourthColor,
              paddingBottom: 10,
            }}>
            <View
              style={{
                backgroundColor: globalColors.thirdColor,
                padding: 10,
                borderRadius: 10,
                marginRight: 10,
              }}>
              <Icon
                name="reader-outline"
                size={50}
                color={globalColors.principalColor}
              />
            </View>
            <Text style={styles.textTitle}>Solicitud servicio</Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                height: 100,
                width: '65%',
              }}>
              <Text style={styles.textInfo}>
                {request?.customerId.name} {request?.customerId.lastName}
              </Text>
              <Text style={styles.textInfo}>
                Calificación: {request?.customerId.score}
              </Text>
            </View>

            <Image
              source={{
                uri: request?.customerId.picture,
              }}
              style={{width: 120, height: 150, borderRadius: 10}}
            />
          </View>

          {request?.coordinates ? (
            <MapView
              initialRegion={{
                latitude: request.coordinates.latitude,
                longitude: request.coordinates.longitude,
                latitudeDelta: 0.0923,
                longitudeDelta: 0.0421,
              }}
              region={{
                latitude: request.coordinates.latitude,
                longitude: request?.coordinates.longitude,
                latitudeDelta: 0.0003,
                longitudeDelta: 0.007,
              }}
              style={styles.mapContainer}>
              <Marker
                coordinate={{
                  latitude: request.coordinates.latitude,
                  longitude: request.coordinates.longitude,
                }}
              />
            </MapView>
          ) : (
            <ActivityIndicator
              size={'large'}
              color={globalColors.principalColor}
            />
          )}

          <Text style={styles.textDescription}>{request?.addressName}</Text>

          <Text
            style={[
              styles.textDescription,
              {
                marginTop: 20,
                color: globalColors.principalColor,
                fontWeight: '800',
              },
            ]}>
            Detalles del servicio
          </Text>

          <Text style={styles.textDescription}>{request?.serviceId.name}</Text>

          <Text style={styles.textDescription}>
            Precio: {request?.serviceId.price}
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <CustomButton
            text="Rechazar"
            styleContainer={{
              width: '45%',
              height: 60,
            }}
            type={ButtonType.danger}
            onPress={() => setVisible(false)}
          />

          <CustomButton
            text="Aceptar"
            styleContainer={{
              width: '45%',
              height: 60,
            }}
            type={ButtonType.primary}
            onPress={acceptRequest}
          />
        </View>
      </View>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: globalColors.backgroundColor,
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  textTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: globalColors.principalColor,
  },
  textInfo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    flexWrap: 'wrap',
  },
  mapContainer: {
    width: Dimensions.get('window').width * 0.8,
    height: 200,
    borderRadius: 10,
  },
  textDescription: {
    color: 'black',
    fontSize: 20,
    marginTop: 10,
  },
});

export default ModalRequestInfo;

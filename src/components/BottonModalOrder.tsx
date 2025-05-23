import React, {useContext, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import MapViewDirections from 'react-native-maps-directions';

import BottonModal from './common/BottomModal';

import googleApiKey from '../constants/googleApiKey';

import {OrderResponseInterface} from '../interface/orderInterface';

import {globalColors} from '../styles/globalVariables';

import {Context as PositionContext} from '../context/PositionContext';

interface BottonModalOrderProps {
  visible: boolean;
  order?: OrderResponseInterface;
  closeModal: () => void;
}
const BottonModalOrder = ({
  visible,
  order,
  closeModal,
}: BottonModalOrderProps) => {
  const {
    state: {position},
  } = useContext(PositionContext);

  return (
    <BottonModal visible={visible}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: 5,
        }}>
        <TouchableOpacity onPress={closeModal}>
          <Icon name="close-outline" color={'black'} size={40} />
        </TouchableOpacity>
      </View>

      <MapView
        style={{flex: 1, width: '100%'}}
        initialRegion={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        focusable>
        {/* <MapViewDirections
          origin={position}
          destination={{
            latitude: order?.coordinates.latitude || 0,
            longitude: order?.coordinates.longitude || 0,
          }}
          apikey={googleApiKey.GOOGLE_MAPS_API_KEY}
          strokeColor={globalColors.principalColor}
          strokeWidth={4}
        /> */}
        <Marker
          coordinate={{
            latitude: order?.coordinates.latitude || 0,
            longitude: order?.coordinates.longitude || 0,
          }}
        />

        <Marker
          coordinate={{
            latitude: position.latitude,
            longitude: position.longitude,
          }}
          pinColor={globalColors.installerPointColor}
        />
      </MapView>
    </BottonModal>
  );
};

export default BottonModalOrder;

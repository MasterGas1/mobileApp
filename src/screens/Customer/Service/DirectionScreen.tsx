/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackScreenProps} from '@react-navigation/stack';

import {globalColors} from '../../../styles/globalVariables';

import {useLocation} from '../../../hooks/useLocation';
import PrincipalButton from '../../../components/common/PrincipalButton';
import ModalAddress from '../../../components/address/ModalAddress';
import AddressButton from '../../../components/address/AddressButton';
import ModallEditAddress from '../../../components/address/ModallEditAddress';

import {Context as AddressContext} from '../../../context/AddressContext';
import {Context as SocketContext} from '../../../context/SocketContext';
import {Context as AuthContext} from '../../../context/AuthContext';

import {RootStackParams} from '../../../navigation/Customer/ServiceStackNavigator';

import {ResponseCreateRequestInterface} from '../../../interface/requestInterface';
import {
  AddressInterface,
  AddressResponseInterface,
} from '../../../interface/addressInterface';

type Props = StackScreenProps<RootStackParams, 'DirectionScreen'>;

const DirectionScreen = ({route, navigation}: Props) => {
  const {serviceId} = route.params;

  const {state, getAddresses} = useContext(AddressContext);
  const {
    state: {socket},
  } = useContext(SocketContext);
  const {
    state: {user},
  } = useContext(AuthContext);

  const {
    getCurrentLocation,
    setNewLocation,
    location,
    address,
    currentLocation,
  } = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [selectedAddressUpdate, setSelectedAddressUpdate] =
    useState<AddressResponseInterface>();

  useEffect(() => {
    getCurrentLocation();
    getAddresses();
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [state.addresses]);

  useEffect(() => {
    if (socket && socket.socket?.id) {
      socket.on(socket.socket.id, (data: ResponseCreateRequestInterface) => {
        navigation.navigate('OrderScreen', {request: data});
      });
    }
  }, [socket]);

  return (
    <View style={styles.container}>
      <ModalAddress isOpen={isOpen} setIsOpen={setIsOpen} />
      <ModallEditAddress
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
        address={selectedAddressUpdate!}
      />

      <MapView
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0923,
          longitudeDelta: 0.0421,
        }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0001,
          longitudeDelta: 0.004,
        }}
        style={styles.map}
        scrollEnabled={false}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>

      <View style={styles.containerInfo}>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              setIsOpen(true);
            }}
            style={styles.buttonAdd}>
            <Icon name="add-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.containerList}
          showsVerticalScrollIndicator={false}>
          <AddressButton
            name="Mi ubicación"
            addressName={address}
            isSelected={selectedAddress === ''}
            isCurrentLocation
            onPress={() => {
              setNewLocation(
                currentLocation.latitude,
                currentLocation.longitude,
              );
              setSelectedAddress('');
            }}
          />
          {state.addresses.map(address => (
            <AddressButton
              name={address.name}
              addressName={address.addressName}
              key={address._id}
              isCurrentLocation={false}
              isSelected={selectedAddress === address._id}
              onPress={() => {
                setNewLocation(
                  address.coordinates.latitude,
                  address.coordinates.longitude,
                );
                setSelectedAddress(address._id);
              }}
              onEditPress={() => {
                setIsOpenEdit(true);
                setSelectedAddressUpdate(address);
              }}
            />
          ))}
        </ScrollView>

        <PrincipalButton
          label="Siguiente"
          onPress={() => {
            socket?.emit('create-request', {
              customerId: user?._id,
              addressName: address,
              serviceId: serviceId,
              coordinates: {
                latitude: location.latitude,
                longitude: location.longitude,
              },
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: globalColors.principalColor,
  },
  map: {
    width: '100%',
    height: '60%',
    borderRadius: 20,
  },
  containerInfo: {
    width: '100%',
    marginTop: 10,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    height: '50%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
  },
  textTitleDirection: {
    fontSize: Dimensions.get('window').width * 0.04,
    fontWeight: 'bold',
    color: 'black',
  },
  textAddress: {
    fontSize: Dimensions.get('window').width * 0.038,
    fontWeight: '700',
    width: '100%',
    color: globalColors.secondaryColor,
  },
  buttonAdd: {
    backgroundColor: globalColors.principalColor,
    borderRadius: 30,
    width: 50,
    height: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitleList: {
    fontSize: Dimensions.get('window').width * 0.04,
    textAlign: 'left',
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',
    width: '100%',
    marginBottom: 10,
  },
  containerList: {
    width: '100%',
    marginTop: 5,
  },
});

export default DirectionScreen;

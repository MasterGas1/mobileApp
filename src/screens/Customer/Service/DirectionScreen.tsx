import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { globalColors } from '../../../styles/globalVariables'

import { useLocation } from '../../../hooks/useLocation';
import PrincipalButton from '../../../components/common/PrincipalButton';
import ModalAddress from '../../../components/ModalAddress';
import AddressButton from '../../../components/AddressButton';

import { Context as AddressContext, getAddresses } from '../../../context/AddressContext';
import { RootStackParams } from '../../../navigation/Customer/ServiceStackNavigator';

type ServiceScreenNavigationProp = StackNavigationProp<RootStackParams, 'DirectionScreen'>

const DirectionScreen = () => {

  const navigation = useNavigation<ServiceScreenNavigationProp>();

  const { state, getAddresses } = useContext(AddressContext)

  const { getCurrentLocation, setNewLocation, location, address } = useLocation();

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getCurrentLocation()
    getAddresses()
  },[])

  useEffect(() => {
    setIsOpen(false)
  },[state.addresses])

  return (
    <View
      style={styles.container}
    >

      <ModalAddress
        isOpen={isOpen}
        setIsOpen={setIsOpen}
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
        scrollEnabled={false}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude
          }}
        />
      </MapView>
      <View style={styles.containerInfo}>
        <View style={{width: "70%"}}>
          <Text style={styles.textTitleDirection}>Ubicación actual</Text>
          <Text style={styles.textAddress}>{address}</Text>
        </View>

        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => setIsOpen(true)}
        >
          <Icon
            name='add'
            size={30}
            color='white'
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.textTitleList}>Direcciones guardas</Text>
      <FlatList
          data={state.addresses}
          keyExtractor={(item) => item._id}
          style={styles.containerList}
          renderItem={({ item }) => (
            <AddressButton
              name={item.name}
              addressName={item.addressName}
              key={item._id}
              onPress={() => setNewLocation(item.coords.latitude, item.coords.longitude)}
            />
          )}
        />

      <PrincipalButton
        label="Siguiente"
        onPress={() => {
          navigation.navigate('OrderScreen')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },
  map: {
    width: "100%",
    height: "40%"
  },
  containerInfo: {
    width: "100%",
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTitleDirection: {
    fontSize: Dimensions.get('window').width * 0.04,
    fontWeight: 'bold',
    color: 'black',
  },
  textAddress: {
    fontSize: Dimensions.get('window').width * 0.038,
    fontWeight: '700',
    width: "100%",
    color: globalColors.secondaryColor,
  },
  buttonAdd: {
    backgroundColor: globalColors.principalColor,
    borderRadius: 30,
    width: 50,
    height: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textTitleList: {
    fontSize: Dimensions.get('window').width * 0.04,
    textAlign: 'left',
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',
    width: "100%",
    marginBottom: 10
  },
  containerList: {
    width: "100%"
  }
})

export default DirectionScreen
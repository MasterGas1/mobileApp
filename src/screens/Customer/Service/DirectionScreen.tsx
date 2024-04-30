import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Icon from 'react-native-vector-icons/Ionicons';

import { globalColors } from '../../../styles/globalVariables'

import { useLocation } from '../../../hooks/useLocation';
import PrincipalButton from '../../../components/common/PrincipalButton';

const DirectionScreen = () => {

  const { getCurrentLocation, location, address } = useLocation();

  useEffect(() => {
    getCurrentLocation()
  },[])

  useEffect(() => {
    console.log(location)
  },[location])

  return (
    <View
      style={styles.container}
    >
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
        >
          <Icon
            name='add'
            size={30}
            color='white'
          />
        </TouchableOpacity>
      </View>

      <PrincipalButton
        label="Siguiente"
        onPress={() => null}
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
    flex: 1
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
  }
})

export default DirectionScreen
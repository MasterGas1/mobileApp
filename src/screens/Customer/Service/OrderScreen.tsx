import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { CommonActions, useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

import { globalColors } from '../../../styles/globalVariables';
import Spacer from '../../../components/common/Spacer';


const OrderScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();

            unsubscribe();

            navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'ServiceScreen' }],
            })
            );
        })

        return unsubscribe;
    },[])

  return (
    <View
      style={styles.container}
    >
        <MapView
            style={styles.map}
        />
        
        <View
            style={styles.installerInfoContainer}
        >
            <Text style={styles.textInstallerWaiting}>Esperando respuesta</Text>
            <View style={{marginTop: 10, marginBottom: 5, flexDirection: 'row'}}>
                <Text style={styles.installerText}>Manuel Barba</Text>
                <View style={{flexDirection: 'row', marginLeft: 10}}>
                    <Icon name="star" size={20} color={globalColors.principalColor} />
                    <Text style={styles.installerText}>4.50</Text>
                </View>
            </View>
            <Text style={styles.installerText}>Calle #10</Text>
        </View>

        <View style={styles.serviceContainerInfo}>
            <Text style={styles.textInstallerWaiting}>Detalles del servicio</Text>
            <Spacer height={10} />
            <Text style={styles.installerText}>Nombre del servicio</Text>
            <Spacer height={5} />
            <Text style={styles.installerText}>Precio: $100</Text>
        </View>
    </View>
  )
}

export default OrderScreen

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
    installerInfoContainer: {
        marginTop: 20,
        width: "100%",
        justifyContent: 'flex-start',
        borderBottomColor: globalColors.secondaryColor,
        borderBottomWidth: 3,
    },
    textInstallerWaiting: {
        fontSize: Dimensions.get('window').width * 0.04,
        fontWeight: 'bold',
        color: globalColors.principalColor,
    },
    installerText: {
        fontSize: Dimensions.get('window').width * 0.038,
        fontWeight: '700',
        color: globalColors.secondaryColor,
    },
    serviceContainerInfo: {
        width: "100%",
        marginTop: 10,
        flexDirection: 'column',
        
    }
})
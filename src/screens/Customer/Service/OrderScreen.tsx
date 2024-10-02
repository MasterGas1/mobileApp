import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { CommonActions, useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { globalColors } from '../../../styles/globalVariables';

import Spacer from '../../../components/common/Spacer';


import { RootStackParams } from '../../../navigation/Customer/ServiceStackNavigator';

type Props = StackScreenProps<RootStackParams, 'OrderScreen'>

const OrderScreen = ({route}: Props) => {

    const {request} = route.params;

    const {serviceId, installerId} = request;

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
            <View style={{marginTop: 10, marginBottom: 5, flexDirection: 'column'}}>
                <Text style={styles.installerText}>{installerId.name} {installerId.lastName}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="star" size={20} color={globalColors.principalColor} />
                    <Text style={styles.installerText}>{installerId.score}</Text>
                </View>
            </View>
            
        </View>

        <View style={styles.serviceContainerInfo}>
            <Text style={styles.textInstallerWaiting}>Detalles del servicio</Text>
            <Spacer height={10} />
            <Text style={styles.installerText}>{serviceId.name}</Text>
            <Spacer height={5} />
            <Text style={styles.installerText}>${serviceId.price}</Text>
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
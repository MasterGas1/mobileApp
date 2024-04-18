import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, useAnimatedValue } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'

import { globalColors } from '../styles/globalVariables'
import { RootStackParams } from '../navigation/Customer/ServiceStackNavigator'


interface ServiceButtonProps {
    name: string
    description: string
    image: string
    id: string
    price ?: number
}

type ServiceScreenNavigationProp = StackNavigationProp<RootStackParams, 'ServiceScreen'>

const ServiceButton = ({name, description, image, id, price}: ServiceButtonProps) => {

    const navigation = useNavigation<ServiceScreenNavigationProp>();

  return (
    <TouchableOpacity 
        style={styles.container}
        onPress={() => {
            if (!price) {
                navigation.push('SubServiceScreen',{name, id, description, price})
            } else {
                navigation.navigate('DirectionScreen')
            }
        }}
    >
        <View>
            <Text style={styles.nameText}>{name}</Text>
            {
                price
                ? <Text style={styles.priceText}>${price}</Text>
                : null   
            }
        </View>
        <View style={styles.imageContainer}>
            <Image
            source={{uri: image}}
            style={styles.image}
            />
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

    container: {
        height: Dimensions.get('window').height * 0.13,
        width: '100%',
        borderRadius: 10,
        borderColor: globalColors.principalColor,
        borderWidth: 2,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameText: {
        color: globalColors.principalColor,
        fontWeight: '600',
        width: 200,
        fontSize: Dimensions.get('window').width * 0.045
    },
    priceText: {
        color: globalColors.secondaryColor,
        width: 200,
        fontWeight: '500',
        fontSize: Dimensions.get('window').width * 0.04
    },
    image: {
        width: '80%',
        height: '100%',
        resizeMode: 'stretch',
    },
    imageContainer: {
        width: '30%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default ServiceButton
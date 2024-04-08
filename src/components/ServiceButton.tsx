import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'

import { globalColors } from '../styles/globalVariables'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface ServiceButtonProps {
    name: string
    description: string
    image: string
    id: string
}

const ServiceButton = ({name, description, image, id}: ServiceButtonProps) => {

  return (
    <TouchableOpacity style={styles.container}>
        <View>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
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
        fontSize: Dimensions.get('window').width * 0.045
    },
    descriptionText: {
        color: 'black',
        fontSize: Dimensions.get('window').width * 0.04
    },
    image: {
        width: '80%',
        height: '100%',
        resizeMode: 'stretch'
    },
    imageContainer: {
        width: '30%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default ServiceButton
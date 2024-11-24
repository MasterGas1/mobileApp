import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { globalColors } from '../styles/globalVariables'


interface RequestIntallerButtonInterface {
    name: string
    service: string
    srcImage: string
    onPress: () => void
}

const RequestIntallerButton = ({name, service, srcImage, onPress}: RequestIntallerButtonInterface) => {
  return (
    <TouchableOpacity
        style={styles.container}
        onPress={onPress}
    >
        <View
            style={{
                height: '100%',
                width: '60%',
                display: 'flex',
                justifyContent: 'flex-start',
            }}
        >
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.serviceText}>{service}</Text>
        </View>

        <View
            style={{
                width: '30%', 
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Image
                source={{uri: srcImage}}
                style={{
                    width: '100%', 
                    height: '100%',
                    backgroundColor: 'white',
                    borderRadius: 10
                }}
                resizeMode='contain'
            />
        </View>
    </TouchableOpacity>
  )
}

export default RequestIntallerButton

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('window').height * 0.13,
        padding: 10,
        borderColor: globalColors.secondaryColor,
        borderWidth: 2.5,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10
    },
    nameText: {
        color: globalColors.principalColor,
        fontWeight: '800',
        fontSize: Dimensions.get('window').width * 0.04
    },
    serviceText: {
        color: 'black',
        fontWeight: '600',
        fontSize: Dimensions.get('window').width * 0.035
    }
})
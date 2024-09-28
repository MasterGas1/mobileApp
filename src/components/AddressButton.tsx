import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { globalColors } from '../styles/globalVariables'

interface AddressButtonProps {
    name: string
    addressName: string
    onPress: () => void
}

const AddressButton = ({name, addressName, onPress}: AddressButtonProps) => {
  return (
    <TouchableOpacity
        style={styles.container} 
        onPress={onPress}
    >
        <View
            style={styles.textNameContainer}
        >
            <Text style={styles.textName}>{name}</Text>
        </View>
        <Text style={styles.textAddress}>{addressName}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderBottomColor: globalColors.secondaryColor,
        borderBottomWidth: 2,
        marginBottom: 10
    },
    textNameContainer: {
        backgroundColor: globalColors.principalColor,
        alignSelf: 'flex-start',
        paddingLeft: 10,
        paddingRight: 10,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderRadius: 4,
        marginBottom: 8
    },
    textName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textAddress: {
        fontSize: 15,
        color: globalColors.secondaryColor,
        fontWeight: 'bold'
    }
})

export default AddressButton
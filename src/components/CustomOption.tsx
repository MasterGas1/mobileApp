import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalColors } from '../styles/globalVariables';

interface OptionProps {
    icon: string;
    text: string;
    onPress: () => void
}

const CustomOption = ({icon, text, onPress}: OptionProps) => {

    return (
        <TouchableOpacity style={styles.optionContainer} onPress={() => onPress()}>
            <View style={styles.optionIcon}>
                <Ionicons name={icon} size={25} color={'white'}/>
            </View>
            <Text style={styles.optionText}>{text}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    optionText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#004d40'
    },
    optionIcon: {
        backgroundColor: globalColors.principalColor,
        borderRadius: 50,
        padding: 5,
    }
})

export default CustomOption
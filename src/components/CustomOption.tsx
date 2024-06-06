import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalColors } from '../styles/globalVariables';

interface OptionProps {
    icon: string;
    text: string;
}

const CustomOption = (props: OptionProps) => {

    const { icon, text } = props

    return (
        <View style={styles.optionContainer}>
            <TouchableOpacity>
                <Ionicons name={icon} size={25} color={'white'} style={styles.optionIcon} />
            </TouchableOpacity>
            <Text style={styles.optionText}>{text}</Text>
        </View>
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
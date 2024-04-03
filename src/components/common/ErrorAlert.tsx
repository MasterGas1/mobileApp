import { View, Text, StyleSheet } from "react-native"
import { globalColors } from "../../styles/globalVariables"
import Ionicons from 'react-native-vector-icons/Ionicons'

interface ErrorAlertProps {
    errorMessage: string
}

const ErrorAlert = ({errorMessage}: ErrorAlertProps) => {
  return (
    <View style={styles.containerAlert}>
        <Ionicons name="alert-circle" size={25} color={'white'} style={{marginRight: 10}}/>
        <Text style={styles.textAlert}>
            {errorMessage}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    containerAlert: {
        backgroundColor: globalColors.dangerColor,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row'
    },
    textAlert: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
})

export default ErrorAlert
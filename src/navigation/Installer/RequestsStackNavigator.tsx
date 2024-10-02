import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import RequestScreen from '../../screens/Installer/Requests/RequestsScreen';

import { globalColors } from '../../styles/globalVariables';

export type RootStackParams = {
    RequestsScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>();

const RequestsStackNavigator = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerTitleAlign: 'left',
            headerStyle: {
                backgroundColor: globalColors.principalColor,
            },
            headerTitleStyle: {
                color: 'white',
                fontSize: Dimensions.get('window').width * 0.05
            },
            headerBackImage: () => (
                <Icon
                    name="arrow-back-outline"
                    size={Dimensions.get('window').width * 0.07}
                    color="white"
                />
            ),
            headerBackTitleVisible: false,
            
        }}
        >
            <Stack.Screen name="RequestsScreen" component={RequestScreen} options={{title: 'Solicitudes'}}/>
        </Stack.Navigator>
    )
}

export default RequestsStackNavigator
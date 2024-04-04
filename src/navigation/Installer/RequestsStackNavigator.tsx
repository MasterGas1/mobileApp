import { createStackNavigator } from '@react-navigation/stack';

import RequestScreen from '../../screens/Installer/Requests/RequestsScreen';

export type RootStackParams = {
    RequestsScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>();

const RequestsStackNavigator = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
          }}
        >
            <Stack.Screen name="RequestsScreen" component={RequestScreen} />
        </Stack.Navigator>
    )
}

export default RequestsStackNavigator
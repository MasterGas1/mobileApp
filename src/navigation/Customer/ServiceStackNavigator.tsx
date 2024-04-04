import { createStackNavigator } from '@react-navigation/stack';

import ServiceScreen from '../../screens/Customer/Service/ServiceScreen';

export type RootStackParams = {
    ServiceScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>();

const ServiceStackNavigator = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
          }}
        >
            <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
        </Stack.Navigator>
    )
}

export default ServiceStackNavigator
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import ServiceStackNavigator from './ServiceStackNavigator';
import RecordStackNavigator from './RecordStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';

const Tab = createBottomTabNavigator();

const CustomerNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name="Servicios" component={ServiceStackNavigator} />
            <Tab.Screen name="Ordenes" component={RecordStackNavigator} />
            <Tab.Screen name="Perfil" component={ProfileStackNavigator} />

        </Tab.Navigator>
    )
}

export default CustomerNavigator;
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import RequestStackNavigator from './RequestsStackNavigator';
import RecordStackNavigator from './RecordStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';

const Tab = createBottomTabNavigator();

const InstallerNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name="Solicitudes" component={RequestStackNavigator} />
            <Tab.Screen name="Ordenes" component={RecordStackNavigator} />
            <Tab.Screen name="Perfil" component={ProfileStackNavigator} />

        </Tab.Navigator>
    )
}

export default InstallerNavigator;
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../../screens/Installer/Profile/ProfileScreen';

export type RootStackParams = {
    ProfileScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>();

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
          }}
        >
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
    )
}

export default ProfileStackNavigator
import { createStackNavigator } from '@react-navigation/stack';

import RecordScreen from '../../screens/Customer/Record/RecordScreen';

export type RootStackParams = {
    RecordScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>();

const RecordStackNavigator = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
          }}
        >
            <Stack.Screen name="RecordScreen" component={RecordScreen} />
        </Stack.Navigator>
    )
}

export default RecordStackNavigator
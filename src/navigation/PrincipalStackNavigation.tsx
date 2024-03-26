import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import FiscalScreen from '../screens/FiscalScreen';

export type RootStackParams = {
    LoginScreen: undefined,
    SignupScreen: undefined,
    FiscalScreen: undefined
} 
  
const Stack = createStackNavigator<RootStackParams>()

const PrincipalStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name='SignupScreen' component={SignupScreen} />
        <Stack.Screen name='FiscalScreen' component={FiscalScreen} />
    </Stack.Navigator>
  )
}

export default PrincipalStackNavigation
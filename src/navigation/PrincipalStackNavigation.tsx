import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';

export type RootStackParams = {
    LoginScreen: undefined
} 
  
const Stack = createStackNavigator<RootStackParams>()

const PrincipalStackNavigation = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default PrincipalStackNavigation
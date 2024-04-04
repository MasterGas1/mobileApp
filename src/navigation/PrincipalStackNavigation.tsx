import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import FiscalScreen from '../screens/FiscalScreen';
import CustomerNavigator from './Customer/CustomerNavigator';
import InstallerNavigator from './Installer/InstallerNavigator';

import { UserSignUpScreenInterface } from '../interface/signupInterface';

import { Context as AuthContext } from '../context/AuthContext';
import { useContext, useEffect } from 'react';

export type RootStackParams = {
    LoginScreen: undefined,
    SignupScreen: undefined,
    FiscalScreen: UserSignUpScreenInterface,
    CustomerNavigator: undefined,
    InstallerNavigator: undefined
} 
  
const Stack = createStackNavigator<RootStackParams>()

const PrincipalStackNavigation = () => {

  const { state, checkToken } = useContext(AuthContext)

  useEffect(() => {
    checkToken();
  },[])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {
        state.token === null && state.role === null
         ? <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
            <Stack.Screen name='SignupScreen' component={SignupScreen} />
            <Stack.Screen name='FiscalScreen' component={FiscalScreen} />
           </>
         :  state.role === 'customer' 
              ? <Stack.Screen name="CustomerNavigator" component={CustomerNavigator} />
              : <Stack.Screen name="InstallerNavigator" component={InstallerNavigator} />
      }
    </Stack.Navigator>
  )
}

export default PrincipalStackNavigation
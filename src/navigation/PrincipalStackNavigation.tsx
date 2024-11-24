import React, {useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useContext, useEffect} from 'react';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import FiscalScreen from '../screens/FiscalScreen';
import CustomerNavigator from './Customer/CustomerNavigator';
import InstallerNavigator from './Installer/InstallerNavigator';

import {UserSignUpScreenInterface} from '../interface/signupInterface';

import {Context as AuthContext} from '../context/AuthContext';
import {Context as SocketContext} from '../context/SocketContext';
import {PermissionContext} from '../context/PermissionsContext';

export type RootStackParams = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  FiscalScreen: UserSignUpScreenInterface;
  CustomerNavigator: undefined;
  InstallerNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const PrincipalStackNavigation = () => {
  const {state, checkToken} = useContext(AuthContext);
  const mounted = useRef(false);

  const {connect} = useContext(SocketContext);
  const {askLocationPermission} = useContext(PermissionContext);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (!mounted.current && state.token) {
      connect();
      askLocationPermission();
      mounted.current = true;
    }
  }, [state.token]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {state.token === null && state.role === null ? (
        <React.Fragment>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="FiscalScreen" component={FiscalScreen} />
        </React.Fragment>
      ) : state.role === 'Customer' ? (
        <Stack.Screen name="CustomerNavigator" component={CustomerNavigator} />
      ) : (
        <Stack.Screen
          name="InstallerNavigator"
          component={InstallerNavigator}
        />
      )}
    </Stack.Navigator>
  );
};

export default PrincipalStackNavigation;

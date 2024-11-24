import {useContext, useEffect, useRef} from 'react';
import Geolocation from '@react-native-community/geolocation';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {globalColors} from '../../styles/globalVariables';

import RequestStackNavigator from './RequestsStackNavigator';
import RecordStackNavigator from './RecordStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';

import {Context as SocketContext} from '../../context/SocketContext';
import {Context as AuthContext} from '../../context/AuthContext';

const Tab = createBottomTabNavigator();

const InstallerNavigator = () => {
  const mounted = useRef(false);

  const {
    state: {socket},
  } = useContext(SocketContext);

  const {
    state: {user},
  } = useContext(AuthContext);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      ({coords}) => {
        const {latitude, longitude} = coords;
        if (socket) {
          socket.emit('update-installer-coordinates', {
            latitude,
            longitude,
            userId: user._id,
          });
        }
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }, [socket]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: Dimensions.get('window').width * 0.03,
          fontWeight: '600',
        },
        tabBarActiveTintColor: globalColors.principalColor,
      }}>
      <Tab.Screen
        name="Solicitudes"
        component={RequestStackNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Icon color={color} size={25} name="return-up-forward-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="Ordenes"
        component={RecordStackNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Icon color={color} size={25} name="receipt-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Icon color={color} size={25} name="person" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default InstallerNavigator;

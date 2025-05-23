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
import {Context as PositionContext} from '../../context/PositionContext';
import {Context as OrderContext} from '../../context/OrderContext';

const Tab = createBottomTabNavigator();

const InstallerNavigator = () => {
  const mounted = useRef(false);

  const {
    state: {socketService},
  } = useContext(SocketContext);

  const {
    state: {user},
  } = useContext(AuthContext);

  const {getPosition} = useContext(PositionContext);

  const {getOrder} = useContext(OrderContext);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      ({coords}) => {
        const {latitude, longitude} = coords;
        if (socketService) {
          socketService.emit('update-installer-coordinates', {
            latitude,
            longitude,
            userId: user._id,
          });
        }
        getPosition(latitude, longitude);
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 20000, // 20 seconds interval
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }, [socketService]);

  useEffect(() => {
    getOrder();
  }, []);

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

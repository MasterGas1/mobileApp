import { useContext, useEffect, useRef } from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { globalColors } from '../../styles/globalVariables';

import RequestStackNavigator from './RequestsStackNavigator';
import RecordStackNavigator from './RecordStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';

import { Context as SocketContext } from '../../context/SocketContext';
import { PermissionContext } from '../../context/PermissionsContext';

const Tab = createBottomTabNavigator();

const InstallerNavigator = () => {

    const mounted = useRef(false);

    const {state: {socket}, connect } = useContext(SocketContext);
    const {askLocationPermission} = useContext(PermissionContext)

    useEffect(() => {
        if (!mounted.current) {
            connect();
            askLocationPermission();
            mounted.current = true;
        }
    },[])

    useEffect(() => {
        // const intervalId = setInterval(() => {
        //     Geolocation.getCurrentPosition(async ({coords}) => {
        //         const {latitude, longitude} = coords

        //         if (socket) {
        //             socket.emit('updateInstallerCoordinates', {
        //                 token,
        //                 latitude, 
        //                 longitude
        //             })
        //         }
        //     })
        // }, 5000)

        // return () => {
        //     clearInterval(intervalId)
        // }
    },[socket])

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: Dimensions.get('window').width * 0.03,
                    fontWeight: '600'
                },
                tabBarActiveTintColor: globalColors.principalColor,
            }}
        >
            <Tab.Screen 
                name="Solicitudes" 
                component={RequestStackNavigator} 
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon
                            color={color}
                            size={25}
                            name="return-up-forward-outline"
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="Ordenes" 
                component={RecordStackNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon
                            color={color}
                            size={25}
                            name="receipt-outline"
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="Perfil" 
                component={ProfileStackNavigator} 
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon
                            color={color}
                            size={25}
                            name="person"
                        />
                    )
                }}
            />

        </Tab.Navigator>
    )
}

export default InstallerNavigator;
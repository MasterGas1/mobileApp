import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import ServiceStackNavigator from './ServiceStackNavigator';
import RecordStackNavigator from './RecordStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';

import { globalColors } from '../../styles/globalVariables';

const Tab = createBottomTabNavigator();

const CustomerNavigator = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: Dimensions.get('window').width * 0.03,
                    fontWeight: '600'
                },
                tabBarActiveTintColor: globalColors.principalColor,
            }
        }
        >
            <Tab.Screen 
                name="Servicios" 
                component={ServiceStackNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon
                            color={color}
                            size={25}
                            name="build"
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
                            name="reader"
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

export default CustomerNavigator;
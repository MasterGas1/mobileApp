import {createStackNavigator} from '@react-navigation/stack';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ServiceScreen from '../../screens/Customer/Service/ServiceScreen';
import SubServiceScreen from '../../screens/Customer/Service/SubServiceScreen';
import DirectionScreen from '../../screens/Customer/Service/DirectionScreen';

import {globalColors} from '../../styles/globalVariables';

import {SubServiceScreenInterface} from '../../interface/subServiceScreenInterface';
import OrderScreen from '../../screens/Customer/Service/OrderScreen';
import {ResponseCreateRequestInterface} from '../../interface/requestInterface';

export type RootStackParams = {
  ServiceScreen: undefined;
  SubServiceScreen: SubServiceScreenInterface;
  DirectionScreen: {serviceId: string};
  OrderScreen: {request: ResponseCreateRequestInterface};
};

const Stack = createStackNavigator<RootStackParams>();

const ServiceStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: globalColors.principalColor,
        },
        headerTitleStyle: {
          color: 'white',
          fontSize: Dimensions.get('window').width * 0.05,
        },
        headerBackImage: () => (
          <Icon
            name="arrow-back-outline"
            size={Dimensions.get('window').width * 0.07}
            color="white"
          />
        ),
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="ServiceScreen"
        component={ServiceScreen}
        options={{title: 'Servicios'}}
      />
      <Stack.Screen name="SubServiceScreen" component={SubServiceScreen} />
      <Stack.Screen
        name="DirectionScreen"
        component={DirectionScreen}
        options={{
          title: 'Selecciona una dirección',
          headerStyle: {
            backgroundColor: globalColors.principalColor,
            borderBottomWidth: 0,
            shadowOpacity: 0,
            elevation: 0,
          },
        }}
      />
      <Stack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default ServiceStackNavigator;

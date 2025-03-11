import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import PrincipalStackNavigation from './src/navigation/PrincipalStackNavigation';

import {Provider as AuthProvider} from './src/context/AuthContext';
import {PermissionProvider} from './src/context/PermissionsContext';
import {Provider as AddressProvider} from './src/context/AddressContext';
import {Provider as SocketProvider} from './src/context/SocketContext';
import {Provider as PositionProvider} from './src/context/PositionContext';
import {Provider as OrderProvider} from './src/context/OrderContext';

const App = () => {
  return (
    <PositionProvider>
      <SocketProvider>
        <AuthProvider>
          <OrderProvider>
            <PermissionProvider>
              <AddressProvider>
                <NavigationContainer>
                  <PrincipalStackNavigation />
                </NavigationContainer>
              </AddressProvider>
            </PermissionProvider>
          </OrderProvider>
        </AuthProvider>
      </SocketProvider>
    </PositionProvider>
  );
};

export default App;

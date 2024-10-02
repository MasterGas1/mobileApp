import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'

import PrincipalStackNavigation from './src/navigation/PrincipalStackNavigation';

import {Provider as AuthProvider} from './src/context/AuthContext';
import { PermissionProvider } from './src/context/PermissionsContext';
import { Provider as AddressProvider } from './src/context/AddressContext';
import {Provider as  SocketProvider} from './src/context/SocketContext'

const App = () => {
  return (
      <SocketProvider>
        <AuthProvider>
          <PermissionProvider>
            <AddressProvider>
              <NavigationContainer>
                <PrincipalStackNavigation/>
              </NavigationContainer>
            </AddressProvider>
          </PermissionProvider>
        </AuthProvider>
      </SocketProvider>
  )
}

export default App
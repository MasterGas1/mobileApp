import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'

import PrincipalStackNavigation from './src/navigation/PrincipalStackNavigation';

import {Provider as AuthProvider} from './src/context/AuthContext';
import { PermissionProvider } from './src/context/PermissionsContext';
import { Provider as AddressProvider } from './src/context/AddressContext';
const App = () => {
  return (
      <AuthProvider>
        <PermissionProvider>
          <AddressProvider>
            <NavigationContainer>
              <PrincipalStackNavigation/>
            </NavigationContainer>
          </AddressProvider>
        </PermissionProvider>
      </AuthProvider>
  )
}

export default App
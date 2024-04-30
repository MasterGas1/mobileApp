import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'

import PrincipalStackNavigation from './src/navigation/PrincipalStackNavigation';

import {Provider as AuthProvider} from './src/context/AuthContext';
import { PermissionProvider } from './src/context/PermissionsContext';
const App = () => {
  return (
      <AuthProvider>
        <PermissionProvider>
          <NavigationContainer>
            <PrincipalStackNavigation/>
          </NavigationContainer>
        </PermissionProvider>
      </AuthProvider>
  )
}

export default App
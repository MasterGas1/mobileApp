import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'

import PrincipalStackNavigation from './src/navigation/PrincipalStackNavigation';

import {Provider as AuthProvider} from './src/context/AuthContext';
const App = () => {
  return (
      <AuthProvider>
        <NavigationContainer>
          <PrincipalStackNavigation/>
        </NavigationContainer>
      </AuthProvider>
  )
}

export default App
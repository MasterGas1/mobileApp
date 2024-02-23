import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler';
import PrincipalStackNavigation from './src/navigation/PrincipalStackNavigation';
import { PaperProvider } from 'react-native-paper';
const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <PrincipalStackNavigation/>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App
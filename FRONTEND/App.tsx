/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import Navigation from './src/navigator/Navigation';
import {PaperProvider} from 'react-native-paper';
import {
  ThemeContext,
  ThemeProvider,
} from './src/context/themeContext/ThemeContext';
import {AuthProvider} from './src/context/AuthContext';

function App(): React.JSX.Element {
  const theme = useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <AppState>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </AppState>
    </ThemeProvider>
  );
}

export default App;

//// Encapsula todos los providers en un solo componente para simplificar App
const AppState: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <AuthProvider>
      <PaperProvider>{children}</PaperProvider>
    </AuthProvider>
  );
};

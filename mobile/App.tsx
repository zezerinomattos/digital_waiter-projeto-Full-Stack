import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// MY IMPORTS
import Routes from './src/routes';

import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#0D0D0D" barStyle="light-content" translucent={false}/>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}


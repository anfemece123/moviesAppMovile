import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './src/navigation/Navigation';
import FadeScreen from './src/screens/FadeScreen';
import {GradientProvider} from './src/context/GradiantContext';

const AppState = ({children}: any) => {
  return <GradientProvider>{children}</GradientProvider>;
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        {/* <FadeScreen /> */}
        <Navigation />
      </AppState>
    </NavigationContainer>
  );
};

export default App;

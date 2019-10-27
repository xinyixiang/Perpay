import React from 'react';
import './services/firebase';
import { Provider, DefaultTheme, Colors } from 'react-native-paper';
import app from './models/app';
import Loading from './components/Loading';
import RouterEntry from './routes/RouterEntry';
import { AppLoading } from 'expo';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'AlertIOS'
])

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.cyan700,
    accent: '#f1c40f',
  },
};

export default () => {
  const [appState, appActions] = app.useStore();
  const { isReady } = appState;

  const loadResourceAsync = async () => {
    // pass
  }

  if (isReady) {
    return (
      <Provider
        theme={theme}
      >
        <Loading />
        <RouterEntry />
      </Provider>
    )
  } else {
    return (
      <AppLoading
        autoHideSplash={false}
        startAsync={loadResourceAsync}
        onFinish={() => appActions.setReady(true)}
      />
    )
  }
}
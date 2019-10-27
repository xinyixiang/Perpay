import { SplashScreen } from 'expo'
import React, { memo, useEffect } from 'react'
import { StatusBar, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import app from '../models/app';
import Auth from '../services/auth'
import user from '../models/user';
import { getProfile } from '../services/user';

export default memo((props: NavigationScreenProps) => {
  const { navigation } = props
  const [, appActions] = app.useStore();
  const [, userActions] = user.useStore();

  const bootstrap = async () => {
    await Auth.subscribe();

    if (Auth.isAuthenticated) {
      await appActions.setAuthState({
        isAuthenticated: Auth.isAuthenticated,
        currentUser: Auth.currentUser
      });

      const profile = await getProfile(Auth.currentUser.uid);

      if (!profile) {
        navigation.navigate('Auth');
      } else {
        await userActions.setProfile(profile);
        navigation.navigate('App');
      }
    } else {
      navigation.navigate('Auth');
    }

    setTimeout(() => SplashScreen.hide(), 300)
  }

  useEffect(() => {
    bootstrap()
  }, [])

  return (
    <View><StatusBar barStyle="default" /></View>
  )
})

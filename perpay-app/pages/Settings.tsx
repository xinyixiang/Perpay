import React from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, Button, Colors } from 'react-native-paper';
import Auth from '../services/auth';
import app from '../models/app';
import { NavigationScreenProps } from 'react-navigation';

export default (props: NavigationScreenProps) => {
  const { navigation } = props;

  const [, appActions] = app.useStore();

  const logout = async () => {
    await Auth.logout();
    await appActions.setAuthState({
      isAuthenticated: false,
      currentUser: null
    });
    navigation.navigate('Auth');
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content
          title="Settings"
        />
      </Appbar.Header>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 15 }}>
        <Button
          mode="contained"
          contentStyle={{ height: 50 }}
          style={{
            backgroundColor: Colors.red700
          }}
          onPress={logout}
        >
          Sign out
        </Button>
      </ScrollView>
    </View>
  )
}
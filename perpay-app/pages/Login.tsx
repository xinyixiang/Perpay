import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Appbar, TextInput, Headline, Subheading, Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Separator from '../components';
import app from '../models/app';
import Auth from '../services/auth';
import { NavigationScreenProps } from 'react-navigation';
import { getProfile } from '../services/user';
import user from '../models/user';

export default (props: NavigationScreenProps) => {
  const { navigation } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [, appActions] = app.useStore();
  const [, userActions] = user.useStore();

  const login = async () => {
    try {
      await appActions.setLoadingState(true);

      await Auth.login(email, password, phoneNumber);
      await appActions.setAuthState({
        isAuthenticated: Auth.isAuthenticated,
        currentUser: Auth.currentUser
      });

      const profile = await getProfile(Auth.currentUser.uid);
      await userActions.setProfile(profile);

      await appActions.setLoadingState(false);
      navigation.navigate('App');
    } catch (error) {
      await appActions.setLoadingState(false);
      Alert.alert(error.message);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="PerPay"></Appbar.Content>
      </Appbar.Header>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 15 }}>
        <Subheading>Set up your account</Subheading>
        <Separator height={15} />
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          textContentType="emailAddress"
        />
        <Separator />
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          textContentType="password"
        />
        <Separator />
        <TextInput
          mode="outlined"
          label="Phone number"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          keyboardType="number-pad"
        />
        <Separator height={30} />
        <Button
          mode="contained"
          contentStyle={{
            height: 50
          }}
          onPress={login}
        >
          Sign in
        </Button>
      </ScrollView>
    </View>
  )
}

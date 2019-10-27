import React, { useEffect, useState } from 'react';
import { View, AlertIOS, ScrollView, Alert } from 'react-native';
import { Appbar, Card, Text, Colors, Button, TextInput, Subheading, List } from 'react-native-paper';
import app from '../models/app';
import Separator from '../components';
import { NavigationScreenProps } from 'react-navigation';
import { addExpense } from '../services/payment';
import user from '../models/user';
import { emit } from '../services/event';

export default (props: NavigationScreenProps) => {
  const { navigation } = props;

  const [appState] = app.useStore();
  const [userState] = user.useStore();
  const [amount, setAmount] = useState('');
  const [payers, setPayers] = useState([]);
  const { profile } = userState;
  const { phoneNumber } = profile;

  const complete = async () => {
    await addExpense(Number(amount), phoneNumber, payers);
    emit('Home.Refresh');
    Alert.alert('Expense has been added!');
    navigation.pop();
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          title="Add an expense"
        />
        <Appbar.Action
          icon="check"
          onPress={complete}
        />
      </Appbar.Header>
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        <TextInput
          mode="outlined"
          label="Amount ($)"
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={text => setAmount(text)}
        />
        <Separator height={30} />
        <Button
          mode="contained"
          contentStyle={{ height: 50 }}
          style={{
            backgroundColor: Colors.indigo500
          }}
          onPress={() => {
            AlertIOS.prompt('Add a Payer', 'Please input his/her phone number', text => {
              setPayers(payers => [...payers, text]);
            })
          }}
        >
          Add a Payer
        </Button>
        <Separator />
        {
          payers.map(item => (
            <List.Item
              key={item}
              title={item}
              left={props => <List.Icon {...props} icon="cellphone" />}
            />
          ))
        }
      </ScrollView>
    </View>
  )
}
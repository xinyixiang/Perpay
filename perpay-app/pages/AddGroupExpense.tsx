import React, { useEffect, useState } from 'react';
import { View, AlertIOS, ScrollView, Alert } from 'react-native';
import { Appbar, Card, Text, Colors, Button, TextInput, Subheading, List, Paragraph } from 'react-native-paper';
import app from '../models/app';
import Separator from '../components';
import { NavigationScreenProps } from 'react-navigation';
import { addExpense } from '../services/payment';
import user from '../models/user';
import { emit } from '../services/event';
import { addGroupExpense } from '../services/groups';

export default (props: NavigationScreenProps) => {
  const { navigation } = props;

  const magicCode = navigation.getParam('magicCode');

  const [userState] = user.useStore();
  const [amount, setAmount] = useState('');
  const { profile } = userState;
  const { phoneNumber } = profile;

  const complete = async () => {
    await addGroupExpense(magicCode, Number(amount), phoneNumber);
    emit('Group.Refresh');
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
          title="Add a Group Expense"
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
        <Paragraph>
          Your group will split the total amount to each member.
          In another word, it means that your group owed you money and lent money to other members.
        </Paragraph>
      </ScrollView>
    </View>
  )
}
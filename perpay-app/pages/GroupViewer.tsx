import React, { useEffect, useState } from 'react';
import { View, AlertIOS, ScrollView } from 'react-native';
import { Appbar, Card, Text, Colors, Button, List, Subheading } from 'react-native-paper';
import app from '../models/app';
import { getWallet } from '../services/user';
import Separator from '../components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationScreenProps } from 'react-navigation';
import user from '../models/user';
import { getTransactions } from '../services/payment';
import { on, off } from '../services/event';
import moment from 'moment';
import { getGroupTransactions, getGroupPhoneNumbers } from '../services/groups';

export default (props: NavigationScreenProps) => {
  const { navigation } = props;

  const magicCode = navigation.getParam('magicCode');
  const name = navigation.getParam('name');

  const [transactions, setTransactions] = useState([]);
  const [members, setMembers] = useState([]);

  const loadTransactions = async () => {
    const transactions = await getGroupTransactions(magicCode);
    setTransactions(transactions);
  }

  const loadMembers = async () => {
    const members = await getGroupPhoneNumbers(magicCode);
    setMembers(members);
  }

  const workflow = async () => {
    await loadTransactions();
    await loadMembers();
  }

  useEffect(() => {
    workflow();

    on('Group.Refresh', () => workflow())

    return () => {
      off('Group.Refresh')
    }
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          title={name}
        />
      </Appbar.Header>
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        <Button
          mode="contained"
          contentStyle={{ height: 50 }}
          style={{
            backgroundColor: Colors.indigo500
          }}
          icon={() => (
            <MaterialCommunityIcons
              name="currency-usd"
              size={20}
              color="white"
            />
          )}
          onPress={() => navigation.push('AddGroupExpense', { magicCode })}
        >
          Add an expense
        </Button>
        <Separator height={40} />
        <Subheading>Members</Subheading>
        <Separator />
        {
          members.map(item => (
            <List.Item
              key={item}
              title={item}
              left={props => <List.Icon {...props} icon="cellphone" />}
            />
          ))
        }
        <Separator height={40} />
        <Subheading>Transactions</Subheading>
        <Separator />
        {
          transactions.map((item, index) => (
            <List.Item
              key={index}
              title={(item.type === 'owed' ? 'Owed $' : 'Lent $') + item.amount}
              description={moment().from(new Date(item.createdAt))}
              left={props => (
                <List.Icon
                  {...props}
                  icon={item.type === 'owed' ? 'arrow-bottom-left' : 'arrow-top-left'}
                />
              )}
              titleStyle={{
                color: item.type === 'owed' ? Colors.red700 : Colors.teal600
              }}
            />
          ))
        }
      </ScrollView>
    </View>
  )
}
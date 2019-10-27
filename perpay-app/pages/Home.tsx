import React, { useEffect, useState } from 'react';
import { View, AlertIOS, ScrollView, RefreshControl, Alert } from 'react-native';
import { Appbar, Card, Text, Colors, Button, List, Subheading } from 'react-native-paper';
import app from '../models/app';
import { getWallet } from '../services/user';
import Separator from '../components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationScreenProps } from 'react-navigation';
import user from '../models/user';
import { getTransactions, settleUpExpense } from '../services/payment';
import { on, off } from '../services/event';
import moment from 'moment';

export default (props: NavigationScreenProps) => {
  const { navigation } = props;

  const [appState] = app.useStore();
  const [userState, userActions] = user.useStore();
  const [refreshing, setRefreshing] = useState(false);
  const [wallet, setWallet] = useState({} as any);
  const [transactions, setTransactions] = useState([]);
  const { profile } = userState;
  const { phoneNumber } = profile;
  const { balance = 0 } = wallet;

  const loadWallet = async () => {
    const wallet = await getWallet(phoneNumber);
    setWallet(wallet);
  }

  const loadTransactions = async () => {
    const transactions = await getTransactions(phoneNumber);
    setTransactions(transactions);
  }

  const settle = async (amount: number, payer: string) => {
    Alert.alert('Settle up', `Are you sure to settle up this transaction? ($${amount})`, [
      {
        text: 'Cancel',
        style: 'destructive',
      },
      {
        text: 'Confirm',
        onPress: async () => {
          await settleUpExpense(amount, phoneNumber, payer);
          await workflow();
        }
      },
    ]);
  }

  const workflow = async () => {
    await loadWallet();
    await loadTransactions();
  }

  useEffect(() => {
    workflow();

    on('Home.Refresh', () => workflow())

    return () => {
      off('Home.Refresh')
    }
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content
          title="Perpay"
        />
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={{ padding: 15 }}
        refreshControl={
          <RefreshControl
            onRefresh={async () => {
              await loadWallet();
              await loadTransactions();
              setRefreshing(false);
            }}
            refreshing={refreshing}
          />
        }
      >
        <Card>
          <Card.Title title="My phone number"></Card.Title>
          <Card.Content>
            <Text>{phoneNumber || 'Loading ...'}</Text>
          </Card.Content>
        </Card>
        <Separator />
        <Card style={{ backgroundColor: Colors.teal500 }}>
          <Card.Title titleStyle={{ color: 'white' }} title="My balance"></Card.Title>
          <Card.Content>
            <Text style={{ color: 'white', fontSize: 30 }}>${balance}</Text>
          </Card.Content>
        </Card>
        {/* <Separator />
        <Button
          mode="contained"
          contentStyle={{ height: 50 }}
          style={{
            backgroundColor: Colors.teal400
          }}
        >
          View my transactions
        </Button> */}
        <Separator />
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
          onPress={() => navigation.push('AddExpense')}
        >
          Add an expense
        </Button>
        <Separator height={40} />
        <Subheading>Transactions</Subheading>
        <Separator />
        {
          transactions.map((item, index) => (
            <List.Item
              key={index}
              title={{
                owed: 'Owed',
                lent: 'Lent',
                group_owed: 'Owed to Group',
                group_lent: 'Lent to Group',
                sent: 'Sent',
                received: 'Received'
              }[item.type] + ' $' + item.amount}
              description={moment().from(new Date(item.createdAt)) + ', To: ' + item.to}
              left={props => (
                <List.Icon
                  {...props}
                  icon={item.type === 'owed' ? 'arrow-bottom-left' : 'arrow-top-left'}
                />
              )}
              titleStyle={{
                color: {
                  owed: Colors.red700,
                  lent: Colors.teal600,
                  group_owed: Colors.red700,
                  group_lent: Colors.teal600,
                  sent: Colors.purple600,
                  received: Colors.purple600
                }[item.type]
              }}
              onPress={() => {
                if (item.type === 'lent') {
                  settle(item.amount, item.to)
                }
              }}
            />
          ))
        }
      </ScrollView>
    </View>
  )
}
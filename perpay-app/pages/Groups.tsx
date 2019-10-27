import React, { useEffect, useState } from 'react';
import { View, ScrollView, AlertIOS } from 'react-native';
import { Appbar, Button, Colors, List } from 'react-native-paper';
import { createGroup, getGroups } from '../services/groups';
import user from '../models/user';
import app from '../models/app';
import Separator from '../components';
import { NavigationScreenProps } from 'react-navigation';

export default (props: NavigationScreenProps) => {
  const { navigation } = props;

  const [appState] = app.useStore();
  const { currentUser } = appState;
  const [groups, setGroups] = useState([]);

  const create = () => {
    AlertIOS.prompt('Form a group', 'Please input a magic number', async magicCode => {
      await createGroup(currentUser.uid, magicCode);
      await loadGroups();
    });
  }

  const loadGroups = async () => {
    const groups = await getGroups(currentUser.uid);
    setGroups(groups);
  }

  useEffect(() => {
    loadGroups();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content
          title="Groups"
        />
      </Appbar.Header>
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        <Button
          mode="contained"
          contentStyle={{ height: 50 }}
          style={{
            backgroundColor: Colors.deepPurple300
          }}
          onPress={create}
        >
          Form a group
        </Button>
        <Separator />
        {
          groups.map((item, index) => (
            <List.Item
              key={index}
              title={item.name}
              description={`Magic code: ${item.magicCode}`}
              left={props => (
                <List.Icon
                  {...props}
                  icon="account-multiple"
                />
              )}
              onPress={() => navigation.push('GroupViewer', item)}
            />
          ))
        }
      </ScrollView>
    </View>
  )
}
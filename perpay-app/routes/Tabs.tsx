import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Home from '../pages/Home';
import Groups from '../pages/Groups';
import Settings from '../pages/Settings';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native-paper';

export default createMaterialBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Ionicons
          name="md-home"
          color={focused ? '#ffffff' : '#ffffff88'}
          size={20}
        />
      ),
    }
  },
  Groups: {
    screen: Groups,
    navigationOptions: {
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Ionicons
          name="md-people"
          color={focused ? '#ffffff' : '#ffffff88'}
          size={20}
        />
      ),
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Ionicons
          name="md-settings"
          color={focused ? '#ffffff' : '#ffffff88'}
          size={20}
        />
      ),
    }
  }
}, {
  initialRouteName: 'Home',
  activeColor: '#ffffff',
  inactiveColor: '#ffffff88',
  barStyle: { backgroundColor: Colors.cyan700 },
});
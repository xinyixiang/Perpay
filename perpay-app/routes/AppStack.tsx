import { createStackNavigator } from 'react-navigation'
import Tabs from './Tabs'
import AddExpense from '../pages/AddExpense'
import GroupViewer from '../pages/GroupViewer'
import AddGroupExpense from '../pages/AddGroupExpense'

export default createStackNavigator({
  Tabs,
  AddExpense,
  AddGroupExpense,
  GroupViewer
}, {
  initialRouteName: 'Tabs',
  headerMode: 'none',
  headerBackTitleVisible: false
})

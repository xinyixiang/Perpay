import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AuthLoading from '../components/AuthLoading'
import AppStack from './AppStack'
import AuthStack from './AuthStack'

export default createAppContainer(createSwitchNavigator({
  AuthLoading,
  Auth: AuthStack,
  App: AppStack
}, {
  initialRouteName: 'AuthLoading'
}))

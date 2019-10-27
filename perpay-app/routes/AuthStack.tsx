import { createStackNavigator } from 'react-navigation'
import Login from '../pages/Login';

export default createStackNavigator({
  Login
}, {
  initialRouteName: 'Login',
  headerMode: 'none',
  headerBackTitleVisible: false
})

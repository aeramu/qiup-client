import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Login from './src/page/Login'
import Register from './src/page/Register'
import Home from './src/page/Home'
import MyProfile from './src/page/MyProfile'
import ChangeProfile from './src/page/ChangeProfile'
import Search from './src/page/Search'
import Profile from './src/page/Profile'

const searchNavigator = createStackNavigator({
    Search: Search,
    Profile: Profile,
})

const myProfileNavigator = createStackNavigator({
    MyProfile: MyProfile,
    ChangeProfile: ChangeProfile,
})

const mainNavigator = createBottomTabNavigator({
    Home: Home,
    searchNavigator,
    myProfileNavigator
})

const authNavigator = createSwitchNavigator({
    Login: Login,
    Register: Register
})

const rootNavigator = createSwitchNavigator({
    authNavigator,
    mainNavigator
})

export default createAppContainer(rootNavigator)
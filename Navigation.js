import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Login from './src/Page/Login'
import Register from './src/Page/Register'
import Home from './src/Page/Home'
import MyProfile from './src/Page/MyProfile'
import ChangeProfile from './src/Page/ChangeProfile'
import Search from './src/Page/Search'
import Profile from './src/Page/Profile'

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
    Search: searchNavigator,
    MyProfile: myProfileNavigator
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
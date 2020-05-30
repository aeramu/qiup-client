import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Login from './src/Page/Login'
import Register from './src/Page/Register'
import Home from './src/Page/Home'
import MyProfile from './src/Page/MyProfile'
import EditProfile from './src/Page/EditProfile'
import Search from './src/Page/Search'
import Profile from './src/Page/Profile'
import Loading from './src/Page/Loading'

const searchNavigator = createStackNavigator({
    'Search': Search,
    'Profile': Profile,
},
{
    defaultNavigationOptions:{
        headerShown:false,
    }
})

const myProfileNavigator = createStackNavigator({
    'MyProfile': MyProfile,
    'EditProfile': EditProfile,
},
{
    defaultNavigationOptions:{
        headerShown:false,
    }
})

const mainNavigator = createBottomTabNavigator({
    'Explore': searchNavigator,
    'Home': Home,
    'Profile': myProfileNavigator
})

const authNavigator = createStackNavigator({
    'Login': Login,
    'Register': Register
},
{
    defaultNavigationOptions:{
        headerShown:false,
    }
})

const rootNavigator = createSwitchNavigator({
    'Loading': Loading,
    authNavigator,
    mainNavigator
})

export default createAppContainer(rootNavigator)
import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Login from './src/Page/Login'
import RegisterEmail from './src/Page/Register/RegisterEmail'
import RegisterPassword from './src/Page/Register/RegisterPassword'
import RegisterUsername from './src/Page/Register/RegisterUsername'
import RegisterProfile from './src/Page/Register/RegisterProfile'
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

const registerNavigator = createStackNavigator({
    'RegisterEmail': RegisterEmail,
    'RegisterPassword': RegisterPassword,
    'RegisterUsername': RegisterUsername,
    'RegisterProfile': RegisterProfile,
},
{
    defaultNavigationOptions:{
        headerShown:false,
    }
})

const authNavigator = createStackNavigator({
    'Login': Login,
    'Register': registerNavigator
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
import React, {useState} from 'react'
import {View, AsyncStorage} from 'react-native'
import {Input, Button} from 'react-native-elements'
import {useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

const CHECK_USERNAME = gql`
    mutation($username:String!){
        isUsernameAvailable(username:$username)
    }
`

const REGISTER = gql`
  mutation ($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password)
  }
`

export default (({navigation})=>{
    const {data} = navigation.state.params

    const [username,setUsername] = useState('')
    const [message,setMessage] = useState('')

    const [checkUsername] = useMutation(CHECK_USERNAME)
    const [register] = useMutation(REGISTER)

    const handleCheckUsername = () => {
        if(username.length < 4){
            setMessage('Username must be at least 4 characters')
        }
        else if(!isValidUsername(username)){
            setMessage('Username can only contain letters, numbers, and underscore')
        }
        else{
            checkUsername({
                variables:{
                    username: username.toLowerCase()
                }
            })
            .then((result) => {
                if(result.data.isUsernameAvailable){
                    register({
                        variables:{
                            email: data.email,
                            password: data.password,
                            username: username
                        }
                    })
                    .then(async (result)=>{
                        await AsyncStorage.setItem('token', result.data.register)
                        navigation.navigate('RegisterProfile')
                    })
                }
                else{
                    setMessage('Username already taken')
                }
            })
        }
    }

    const isValidUsername = (username) => {
        let reg = /^\w+$/
        return reg.test(username)
    }

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingHorizontal:15}}>
            <Input
                placeholder='Username'
                inputStyle={{fontSize:15}}
                inputContainerStyle={{borderWidth:1,borderRadius:10,paddingHorizontal:10}}
                autoCapitalize='none'
                errorMessage={message}
                onChangeText={(text) => {
                    setMessage('')
                    setUsername(text)
                }}
            />
            <Button
                title='Next'
                buttonStyle={{paddingHorizontal:30,borderRadius:10}}
                onPress={handleCheckUsername}
            />
        </View>
    )
})
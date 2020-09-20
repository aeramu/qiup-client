import React, {useState} from 'react'
import {View, AsyncStorage} from 'react-native'
import {Input, Button} from 'react-native-elements'
import {useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

const SET_USERNAME = gql`
    mutation($username:String!){
        setShareUsername(username:$username)
    }
`

export default (({navigation})=>{
    const [username,setUsername] = useState('')
    const [message,setMessage] = useState('')

    const [checkUsername] = useMutation(SET_USERNAME)

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
                if(result.data.setShareUsername == ""){
                    navigation.navigate('RegisterProfile',{data:{username}})
                }
                else{
                    setMessage(result.data.setShareUsername)
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
                inputContainerStyle={{borderWidth:1,borderRadius:20,paddingHorizontal:15}}
                autoCapitalize='none'
                errorMessage={message}
                onChangeText={(text) => {
                    setMessage('')
                    setUsername(text)
                }}
            />
            <Button
                title='Next'
                buttonStyle={{paddingHorizontal:40,borderRadius:20}}
                onPress={handleCheckUsername}
            />
        </View>
    )
})
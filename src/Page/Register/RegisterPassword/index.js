import React, {useState} from 'react'
import {View, AsyncStorage} from 'react-native'
import {Input, Button} from 'react-native-elements'
import {gql} from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

const REGISTER = gql`
  mutation ($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`

export default (({navigation})=>{
    const {data} = navigation.state.params

    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [messagePassword,setMessagePassword] = useState('')
    const [messageConfirmPassword,setMessageConfirmPassword] = useState('')

    const [register] = useMutation(REGISTER)

    const handleCheckPassword = () => {
        if(password.length < 8){
            setMessagePassword('Password must be at least 8 characters')
        }
        else if(password != confirmPassword){
            setMessageConfirmPassword('Confirm password doesn\'t match')
        }
        else{
            register({
                variables:{
                    email: data.email,
                    password: password,
                }
            })
            .then(async (result)=>{
                await AsyncStorage.setItem('token', result.data.register)
                navigation.navigate('RegisterUsername')
            })
        }
    }

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingHorizontal:15}}>
            <Input
                placeholder='Password'
                inputContainerStyle={{borderWidth:1,borderRadius:20,paddingHorizontal:15}}
                inputStyle={{fontSize:15}}
                autoCapitalize='none'
                secureTextEntry={true}
                errorMessage={messagePassword}
                onChangeText={(text) => {
                    setMessagePassword('')
                    setPassword(text)
                }}
            />
            <Input
                placeholder='Confirm password'
                inputContainerStyle={{borderWidth:1,borderRadius:20,paddingHorizontal:15}}
                inputStyle={{fontSize:15}}
                autoCapitalize='none'
                secureTextEntry={true}
                errorMessage={messageConfirmPassword}
                onChangeText={(text) => {
                    setMessageConfirmPassword('') 
                    setConfirmPassword(text)
                }}
            />
            <Button
                title='Next'
                buttonStyle={{paddingHorizontal:40,borderRadius:20}}
                onPress={handleCheckPassword}
            />
        </View>
    )
})
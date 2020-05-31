import React, {useState} from 'react'
import {View} from 'react-native'
import {Input, Button} from 'react-native-elements'
import {gql} from 'apollo-boost'

const CHECK_EMAIL = gql`
    mutation($email:String!){
        isEmailAvailable(email:$email)
    }
`

export default (({navigation})=>{
    const {data} = navigation.state.params

    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [messagePassword,setMessagePassword] = useState('')
    const [messageConfirmPassword,setMessageConfirmPassword] = useState('')

    const handleCheckPassword = () => {
        if(password.length < 8){
            setMessagePassword('Password must be at least 8 characters')
        }
        else if(password != confirmPassword){
            setMessageConfirmPassword('Confirm password doesn\'t match')
        }
        else{
            navigation.navigate('RegisterUsername',{
                data:{
                    email: data.email,
                    password
                }
            })
        }
    }

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingHorizontal:15}}>
            <Input
                placeholder='Password'
                inputContainerStyle={{borderWidth:1,borderRadius:10,paddingHorizontal:10}}
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
                inputContainerStyle={{borderWidth:1,borderRadius:10,paddingHorizontal:10}}
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
                buttonStyle={{paddingHorizontal:30,borderRadius:10}}
                onPress={handleCheckPassword}
            />
        </View>
    )
})
import React, {useState} from 'react'
import {View} from 'react-native'
import {Input, Button} from 'react-native-elements'
import {useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

const CHECK_EMAIL = gql`
    mutation($email:String!){
        isEmailAvailable(email:$email)
    }
`

export default (({navigation})=>{
    const [email,setEmail] = useState('')
    const [message,setMessage] = useState('')

    const [checkEmail] = useMutation(CHECK_EMAIL)

    const handleCheckEmail = () => {
        if(!isValidEmail(email)){
            setMessage('Please enter a valid email address')
        }
        else{
            checkEmail({
                variables:{
                    email: email.toLowerCase()
                }
            })
            .then((result) => {
                if(result.data.isEmailAvailable){
                    navigation.navigate('RegisterPassword',{data:{email}})
                }
                else{
                    setMessage('Email already registered')
                }
            })
        }
    }

    const isValidEmail = (email) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return reg.test(email)
    }

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingHorizontal:15}}>
            <Input
                placeholder='Email'
                inputStyle={{fontSize:15}}
                inputContainerStyle={{borderWidth:1,borderRadius:10,paddingHorizontal:10}}
                autoCapitalize='none'
                errorMessage={message}
                onChangeText={(text) => {
                    setMessage('')
                    setEmail(text)
                }}
            />
            <Button
                title='Next'
                buttonStyle={{paddingHorizontal:30,borderRadius:10}}
                onPress={handleCheckEmail}
            />
        </View>
    )
})
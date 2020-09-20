import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { View, AsyncStorage } from 'react-native';
import {Button, Input, Text} from 'react-native-elements'
import { gql } from 'apollo-boost';

const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

export default ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('')

  const [loginMutation] = useMutation(LOGIN)

  const handleLogin = () => {
    loginMutation({
      variables: {
        email,
        password
      }
    })
    .then(async (result) => {
      if (result.data.login.indexOf('token') == -1){
        setMessage(result.data.login)
      } else{
        await AsyncStorage.setItem('token',result.data.login)
        navigation.navigate('Home')
      }
    })
  }

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingHorizontal:30}}>
      <Input
        inputStyle={{fontSize:15}}
        inputContainerStyle={{borderWidth:1,borderRadius:20,paddingHorizontal:15}}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder="Password"
        inputStyle={{fontSize:15}}
        inputContainerStyle={{borderWidth:1,borderRadius:20,paddingHorizontal:15}}
        autoCapitalize='none'
        secureTextEntry={true}
        errorMessage={message}
        onChangeText={text => {
          setMessage('')
          setPassword(text)
      }}
      />
      <Button
        title="Login"
        buttonStyle={{paddingHorizontal:40,borderRadius:20}}
        onPress={handleLogin}  
      />
    </View>
  );
}
  
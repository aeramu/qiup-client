import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { StyleSheet, View, Text, TextInput, Button, AsyncStorage } from 'react-native';
import { gql } from 'apollo-boost';

const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

export default ({navigation}) => {
  //form input
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
 
  // useEffect(()=>{
  //   check token in async storage
  //   console.log('use effect')
  // })
  // console.log('not use effect')
  //if (!message) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10, margin: 10 }}
        placeholder="Email or username"
        autoCapitalize="none"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10, margin: 10 }}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <Text
        style={{marginBottom: 10, color:'red'}}
        >{message}
      </Text>
      <Button
        title="Login"
        onPress={handleLogin}  
      />
      <View style={{margin:20, alignSelf:'center', flexDirection:'row'}}>
        <Text>Don't have an account? </Text>
        <Text
          style={{color: 'blue'}}
          onPress={()=>navigation.navigate('Register')}
          >Register
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
  
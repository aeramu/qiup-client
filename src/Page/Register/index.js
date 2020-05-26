import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import { gql } from 'apollo-boost';

const REGISTER = gql`
  mutation ($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password)
  }
`

export default ({navigation}) => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const [registerMutation] = useMutation(REGISTER)

  const handleRegister = () => {
    if (password == confirmPassword){
      registerMutation({
        variables:{
          email,
          username,
          password
        }
      })
      .then(async (result)=>{
        if (result.data.register.indexOf('token') == -1){
          setMessage(result.data.register)
        } else{
          await AsyncStorage.setItem('token', result.data.register)
          navigation.navigate('Home')
        }
      })
    } else{
      setMessage('Password doesn\'t match')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10, margin: 10 }}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10, margin: 10 }}
        placeholder="Username"
        autoCapitalize="none"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10, margin: 10 }}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10, margin: 10 }}
        placeholder="Confirm password"
        secureTextEntry={true}
        onChangeText={text => setConfirmPassword(text)}
      />
      <Text
        style={{marginBottom: 10, color:'red'}}
        >{message}
      </Text>
      <Button
        title="Register"
        onPress={handleRegister}  
      />
      <View style={{margin:20, margin: 20, alignSelf:'center', flexDirection:'row'}}>
        <Text>Already have an account? </Text>
        <Text
          style={{color: 'blue'}}
          onPress={()=>navigation.navigate('Login')}
        >Login</Text>
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
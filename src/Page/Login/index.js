import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
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

  const [loginMutation] = useMutation(LOGIN)

  const handleLogin = () => {
    loginMutation({
      variables: {
        email,
        password
      }
    })
    .then(console.log)
    navigation.navigate('Home')
  }
 
  useEffect(()=>{
    //check token in async storage
    console.log('use effect')
  })
  console.log('not use effect')
  //if (!message) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10, margin: 20 }}
        placeholder="email"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10, margin: 20 }}
        placeholder="password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <Button
        title="Login"
        onPress={handleLogin}  
      />
      <View style={{margin:20, margin: 20, alignSelf:'center', flexDirection:'row'}}>
        <Text>Don't have an account? </Text>
        <Text
          style={{color: 'blue'}}
          onPress={()=>navigation.navigate('Register')}
        >Register</Text>
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
  
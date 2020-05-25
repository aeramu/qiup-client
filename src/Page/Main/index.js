import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { gql } from 'apollo-boost';

const GET_HELLOWORLD = gql`
  {
    hello
  }
`;

const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default () => {
  const [message, setMessage] = useState(null);
  const [loginMutation] = useMutation(LOGIN)
  const [hello] = useLazyQuery(
    GET_HELLOWORLD, {
      onCompleted(data) {
        setMessage(data.hello)
      },
      onError(error) {
        console.log(error, 'ERROR')
      }
    }
  )

  //form input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    loginMutation({
      variables: {
        email,
        password
      }
    })
    .then(console.log)
  }

  useEffect(() => {
    // get message hello world from backend
    hello();
  }, [])

  if (!message) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text>Apps running</Text>
      <Text>{message}</Text>
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10 }}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="email"
      />
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10 }}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="password"
      />
      <Button title="Submit" onPress={handleLogin}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
  
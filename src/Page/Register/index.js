import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default ({navigation}) => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10, margin: 20 }}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10, margin: 20 }}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10, margin: 20 }}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10, margin: 20 }}
        placeholder="Confirm password"
        secureTextEntry={true}
        onChangeText={text => setConfirmPassword(text)}
      />
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
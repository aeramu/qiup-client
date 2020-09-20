import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import {useApolloClient} from '@apollo/react-hooks'

export default ({navigation}) => {
  const client = useApolloClient()

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token')
    client.resetStore()
    navigation.navigate('Authentication')
  }

  return (
    <View style={{flex:1}}>
      <Text>Open up App.tsx to start working on your app!</Text>
      


      <Button
        title='logout'
        onPress={handleLogout}
      />
    </View>
  );
}
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
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button
        title='logout'
        onPress={handleLogout}
      />
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
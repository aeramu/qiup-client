import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import {useQuery} from '@apollo/react-hooks'
import { gql } from 'apollo-boost';

const MY_PROFILE = gql`
  query{
    me{
      username
      profile{
        name
        bio
      }
    }
  }
`

export default ({navigation}) => {
  const {loading, data, client} = useQuery(MY_PROFILE)

  if (loading) return (
    <View style={styles.container}>
      <Text>Loading....</Text>
    </View>
  )

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token')
    client.resetStore()
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>{data.me.username}</Text>
      <Text>{data.me.profile.name}</Text>
      <Text>{data.me.profile.bio}</Text>
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
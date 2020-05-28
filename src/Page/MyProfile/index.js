import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import {useQuery} from '@apollo/react-hooks'
import { gql } from 'apollo-boost';

const MY_PROFILE = gql`
  query{
    me{
      id
      username
      profile{
        name
        bio
      }
    }
  }
`

export default ({navigation}) => {
  const {loading, data} = useQuery(MY_PROFILE)

  if (loading) return (
    <View style={styles.container}>
      <Text>Loading....</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Button
        title='Edit Profile'
        onPress={() => navigation.navigate('EditProfile',{data})}
      />
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>{data.me.username}</Text>
      <Text>{data.me.profile.name}</Text>
      <Text>{data.me.profile.bio}</Text>
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
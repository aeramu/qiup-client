import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default ({navigation}) => {
  const {data} = navigation.state.params
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>{data.account.username}</Text>
      <Text>{data.account.profile.name}</Text>
      <Text>{data.account.profile.bio}</Text>
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
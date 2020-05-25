import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <TextInput/>
      <TextInput/>
      <Button title='Register' onPress={()=>navigation.navigate('Home')}>Login</Button>
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
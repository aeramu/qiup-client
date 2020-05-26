import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default ({navigation}) => {
  const [username, setUsername] = useState('')

  const handleSearch = () => {
    navigation.navigate('Profile')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10, margin: 20 }}
        placeholder="Search..."
        onChangeText={text => setUsername(text)}
      />
      <Button
        title="Search"
        style={{alignSelf: 'center'}}
        onPress={handleSearch}  
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
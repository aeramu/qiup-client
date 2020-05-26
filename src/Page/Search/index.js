import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import {useLazyQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

const ACCOUNT = gql`
  query($id: ID!){
    account(id: $id){
      username
      profile{
        name
        bio
      }
    }
  }
`

export default ({navigation}) => {
  const [id, setID] = useState('')
  const [searchAccount,{data}] = useLazyQuery(
    ACCOUNT, {
      variables:{
        id
      },
      onCompleted(data){
        console.log(data)
        navigation.navigate('Profile',{data})
      }
    }
  )

  const handleSearch = () => {
    searchAccount()
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10, margin: 20 }}
        placeholder="Search..."
        autoCapitalize='none'
        onChangeText={text => setID(text)}
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
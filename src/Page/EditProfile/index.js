import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import {useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

const EDIT_PROFILE = gql`
  mutation($name: String!, $bio: String!, $profilePhoto: String!){
    editProfile(name: $name, bio: $bio, profilePhoto: $profilePhoto){
      id
      username
      profile{
        name
        bio
        profilePhoto
      }
    }
  }
`

export default ({navigation}) => {
  const {data} = navigation.state.params
  console.log(data)
  const [name,setName] = useState(data.me.profile.name)
  const [bio, setBio] = useState(data.me.profile.bio)
  const [profilePhoto, setProfilePhoto] = useState(data.me.profile.profilePhoto)

  const [editProfile] = useMutation(EDIT_PROFILE)

  const handleEditProfile = () => {
    editProfile({
      variables:{
        name,
        bio,
        profilePhoto,
      }
    })
    .then(()=>{
      navigation.navigate('MyProfile')
    })
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Image
        style={styles.tinyLogo}
        source={{uri: data.me.profile.profilePhoto}}
      />
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10, margin: 10 }}
        value={name}
        autoCapitalize="none"
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={{ height: 40, borderWidth: 1, padding: 10, margin: 10 }}
        value={bio}
        autoCapitalize="none"
        onChangeText={text => setBio(text)}
      />
      <Button
        title='save'
        onPress={handleEditProfile}
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
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
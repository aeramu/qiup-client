import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import {useMutation, useLazyQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import * as ImagePicker from 'expo-image-picker'
//import axios from 'axios'

var Buffer = require('buffer/').Buffer

const UPLOAD_IMAGE = gql`
  mutation{
    uploadImage(directory: "profile_photo")
  }
`

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
  const [name,setName] = useState(data.me.profile.name)
  const [bio, setBio] = useState(data.me.profile.bio)
  const [profilePhoto, setProfilePhoto] = useState(data.me.profile.profilePhoto)

  const [editProfile] = useMutation(EDIT_PROFILE)
  const [uploadImage] = useMutation(UPLOAD_IMAGE)

  const handlePickImage = async () => {
    const {base64} = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
    })

    uploadImage()
    .then((result)=>{
      fetch(result.data.uploadImage,{
        method:'PUT',
        body: Buffer.from(base64, 'base64'),
        headers: {
          'Content-Type':'image/jpeg',  
          'x-amz-acl':'public-read'
        }
      })
      .then(()=>{
        setProfilePhoto(result.data.uploadImage.substring(0,result.data.uploadImage.indexOf('?')))
      })
    })
  }

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
        source={{uri: profilePhoto}}
      />
      <Button
        title='change photo'
        onPress={handlePickImage}
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
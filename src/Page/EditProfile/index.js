import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import {useMutation, useLazyQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import * as ImagePicker from 'expo-image-picker'
//import axios from 'axios'

var Buffer = require('buffer/').Buffer

const UPLOAD_IMAGE_URL = gql`
  query{
    uploadImageURL(directory: "profile_photo")
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
  const [getUploadImageURL] = useLazyQuery(UPLOAD_IMAGE_URL)

  const handlePickImage = async () => {
    const {base64} = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
    })

    const url = 'https://qiup-image.s3.amazonaws.com/profile-photo/a124ac74-63ac-4ed4-b58a-ceac09e4d5f1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIASRJURG3KY7RMJLXD%2F20200529%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200529T134623Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0xIkcwRQIgWZimEES1P1Pl4Zs7cjr1eBogGsO68MP6KbZBi8g%2Fv9YCIQCTbW7K9sTQSL1MafmZpZ1vQ7myp1EaMoA4TGLDyZgudyrTAQjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDE3NDU5MzIyNjQ1MyIMQ4KrDKUUSuED397hKqcBX%2FuL1jE0x71ftwU2X6aeNOrOaU3IjfitOcK01NTewZlKJK8HiMCVD179JG3rZ0EYMBM9KCh60a7hZURwsysgrDfbUjh%2FLzTM1oWO0bL31jXAcf6gvj7ncTXkA3Z1zRaIIZmYg6Ey69SrOPQY7VVZSBENoazfKyMgDFFWFGqC%2F98D%2FwGmyrns0OKBVVDhUvWkp6L2B9dFm3DwqTpg0gyhjHoqA1wfL50wvqPE9gU64AGVa2xKxg9bG5k2m%2BVe1au0fzhoOsBoubjejm5lqsSy7PgRJJ4c62NZHxLntObO5UX98ZndKvOeeO2tTpyMV0zejpBLsSPDywV8Yg55ZBS6y6gaDiFV4qHMFL6aNoGN%2F%2BRN0zQev2i2HnbELEJyAbn68dmc4aatHfIjYJvfIxfYTFwLuy8PllNhJKEWYxAvOZ0Ovc2KuRRH97v7gUsq5nMWv0MTqWuDEmgXcqrnb0Wb%2Bcyz%2F5%2ByCQbts2NGqqwKc4qSu9wa7HEONQO%2BwVPiZ%2FStbIf%2FvWt2dxPDiVHSlaxd9g%3D%3D&X-Amz-SignedHeaders=host%3Bx-amz-acl&X-Amz-Signature=6c1e2c3a91d7172bf6219f12475f5b98fa6fc7c17414592b7b2ad8185093b571'

    // axios.put(url, Buffer.from(base64, 'base64'), {
    //   headers: {
    //     'Content-Type':'image/jpeg',  
    //     'x-amz-acl':'public-read'
    //   }
    // })
    fetch(url,{
      method:'PUT',
      body: Buffer.from(base64, 'base64'),
      headers: {
        'Content-Type':'image/jpeg',  
        'x-amz-acl':'public-read'
      }
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
        source={{uri: data.me.profile.profilePhoto}}
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
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Dimensions, TouchableHighlight } from 'react-native';
import {useMutation, useLazyQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'
import * as ImagePicker from 'expo-image-picker'

var Buffer = require('buffer/').Buffer

const UPLOAD_IMAGE = gql`
  mutation($directory: String!){
    uploadImage(directory: $directory)
  }
`

const EDIT_PROFILE = gql`
  mutation($name: String!, $bio: String!, $profilePhoto: String!, $coverPhoto: String!){
    editProfile(name: $name, bio: $bio, profilePhoto: $profilePhoto, coverPhoto: $coverPhoto){
      id
      username
      profile{
        name
        bio
        profilePhoto
        coverPhoto
      }
    }
  }
`

export default ({navigation}) => {
  const {data} = navigation.state.params
  const [name,setName] = useState(data.me.profile.name)
  const [bio, setBio] = useState(data.me.profile.bio)
  const [profilePhoto, setProfilePhoto] = useState(data.me.profile.profilePhoto)
  const [coverPhoto, setCoverPhoto] = useState(data.me.profile.coverPhoto)

  const [editProfile] = useMutation(EDIT_PROFILE)
  const [uploadImage] = useMutation(UPLOAD_IMAGE)

  const handleChangeCoverPhoto = async () => {
    const {base64} = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 2],
        quality: 1,
        base64: true,
    })
    uploadImage({
      variables:{
        directory: "cover-photo"
      }
    })
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
        setCoverPhoto(result.data.uploadImage.substring(0,result.data.uploadImage.indexOf('?')))
      })
    })
  }

  const handleChangeProfilePhoto = async () => {
    const {base64} = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
    })
    uploadImage({
      variables:{
        directory: "profile-photo"
      }
    })
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
        coverPhoto,
      }
    })
    .then(()=>{
      navigation.navigate('MyProfile')
    })
  }
  return (
    <View style={{flex:1}}>
      <TouchableHighlight onPress={handleChangeCoverPhoto}>
        <Image
          style={{alignSelf:'stretch', height:Math.round(Dimensions.get('window').width*2/3)}}
          source={{uri: coverPhoto}}
        />
      </TouchableHighlight>
      <View style={{flex:1,paddingHorizontal:15}}>
        <View style={{height:50,flexDirection:'row',alignItems:'flex-end'}}>
          <TouchableHighlight
            onPress={handleChangeProfilePhoto}
            style={{width:100,height:100,borderRadius:100}}
          >
            <Image
              style={{width:100, height:100, borderRadius:100, borderWidth:2, borderColor:'white'}}
              source={{uri: data.me.profile.profilePhoto}}
            />
          </TouchableHighlight>
        </View>
        <TextInput
          style={{height:40,borderWidth:1,padding:10,margin:10}}
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={{height:40,borderWidth:1,padding:10,margin:10}}
          value={bio}
          autoCapitalize="none"
          onChangeText={text => setBio(text)}
        />
        <Button
          title='save'
          onPress={handleEditProfile}
        />
      </View>
    </View>
    // <View style={{flex:1}}>
    //   <TouchableHighlight
    //     style={{height:Math.round(Dimensions.get('window').width*2/3)}}
    //     onPress={handleChangeCoverPhoto}
    //   >
    //     <Image
    //       style={{alignSelf:'stretch',height:Math.round(Dimensions.get('window').width*2/3)}}
    //       source={{uri: coverPhoto}}
    //     />
    //   </TouchableHighlight>
    //   <View style={{height:50,justifyContent:'flex-end',paddingHorizontal:15}}>
    //     <TouchableHighlight
    //       onPress={handleChangeProfilePhoto}
    //       style={{width:100,height:100,borderRadius:100}}
    //     >
    //       <Image
    //         style={{width:100,height:100,borderRadius:100,borderWidth:2,borderColor:'white'}}
    //         source={{uri: profilePhoto}}
    //       />
    //     </TouchableHighlight>
    //     <TextInput
    //       style={{height:40,borderWidth:1,padding:10,margin:10}}
    //       value={name}
    //       autoCapitalize="none"
    //       onChangeText={text => setName(text)}
    //     />
    //     <TextInput
    //       style={{height:40,borderWidth:1,padding:10,margin:10}}
    //       value={bio}
    //       autoCapitalize="none"
    //       onChangeText={text => setBio(text)}
    //     />
    //     <Button
    //       title='save'
    //       onPress={handleEditProfile}
    //     />
    //   </View>
    // </View>
  );
}
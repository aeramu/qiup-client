import React, {useState} from 'react';
import {View, TextInput, Dimensions, Image, TouchableHighlight } from 'react-native';
import {Avatar, Button} from 'react-native-elements'
import {useMutation} from '@apollo/react-hooks'
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
    setShareProfile(name: $name, bio: $bio, profilePhoto: $profilePhoto, coverPhoto: $coverPhoto){
      id
      name
      bio
      profilePhoto
      coverPhoto
    }
  }
`

export default ({navigation}) => {
  const {data} = navigation.state.params
  const [name,setName] = useState(data.myShareAccount.name)
  const [bio, setBio] = useState(data.myShareAccount.bio)
  const [profilePhoto, setProfilePhoto] = useState(data.myShareAccount.profilePhoto)
  const [coverPhoto, setCoverPhoto] = useState(data.myShareAccount.coverPhoto)

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
      <View style={{flex:1,paddingHorizontal:25}}>
        <View style={{height:50,flexDirection:'row',alignItems:'flex-end'}}>
          <Avatar
            rounded
            size={100}
            containerStyle={{borderWidth:2, borderColor:'white'}}
            source={{uri: profilePhoto}}
            onPress={handleChangeProfilePhoto}
          />
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
          title='Save'
          buttonStyle={{borderRadius:10}}
          onPress={handleEditProfile}
        />
      </View>
    </View>
  );
}
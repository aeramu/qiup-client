import React, {useState} from 'react';
import {View, Dimensions, Image, TouchableHighlight} from 'react-native';
import {Avatar, Button, Input} from 'react-native-elements'
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
    <View style={{flex:1,marginBottom:20,justifyContent:'flex-end'}}>
      <TouchableHighlight onPress={handleChangeCoverPhoto}>
        <Image
          style={{alignSelf:'stretch', height:Math.round(Dimensions.get('window').width*2/3)}}
          source={{uri: coverPhoto}}
        />
      </TouchableHighlight>
      <View style={{paddingHorizontal:15}}>
        <View style={{height:50,flexDirection:'row',alignItems:'flex-end'}}>
          <Avatar
            rounded
            size={100}
            containerStyle={{borderWidth:2, borderColor:'white'}}
            source={{uri: profilePhoto}}
            onPress={handleChangeProfilePhoto}
          />
        </View>
        <View style={{alignItems:'center',marginVertical:20}}>
          <Input
            label='Name'
            inputStyle={{fontSize:15}}
            inputContainerStyle={{borderWidth:1,borderRadius:10,paddingHorizontal:15}}
            value={name}
            onChangeText={text => setName(text)}
          />
          <Input
            label='Bio'
            inputStyle={{fontSize:15}}
            inputContainerStyle={{borderWidth:1,borderRadius:10,paddingHorizontal:15,paddingVertical:5}}
            value={bio}
            multiline={true}
            onChangeText={text => setBio(text)}
          />
          <Button
            title='Save'
            buttonStyle={{paddingHorizontal:40,borderRadius:20}}
            onPress={handleEditProfile}
          />
        </View>
      </View>
    </View>
  );
}
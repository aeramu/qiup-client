import React, {useState} from 'react'
import {View} from 'react-native'
import {Input, Button, Avatar} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import {useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

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

export default (({navigation})=>{
    const [name,setName] = useState('')
    const [profilePhoto,setProfilePhoto] = useState('https://qiup-image.s3.amazonaws.com/profile-photo/default.jpg')

    const [editProfile] = useMutation(EDIT_PROFILE)
    const [uploadImage] = useMutation(UPLOAD_IMAGE)

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
            bio:'',
            profilePhoto,
            coverPhoto:'https://qiup-image.s3.amazonaws.com/cover-photo/default.jpg',
          }
        })
        .then(()=>{
          navigation.navigate('Home')
        })
    }

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingHorizontal:15}}>
            <Avatar
                rounded
                size={100}
                source={{uri:profilePhoto}}
                onPress={handleChangeProfilePhoto}
            />
            <Input
                placeholder='Name'
                containerStyle={{margin:20}}
                inputContainerStyle={{borderWidth:1,borderRadius:10,paddingHorizontal:10}}
                onChangeText={(text) => setName(text)}
            />
            <Button
                title='Next'
                buttonStyle={{paddingHorizontal:30,borderRadius:10}}
                onPress={handleEditProfile}
            />
        </View>
    )
})
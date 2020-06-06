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
  mutation($username: String!,$name: String!, $bio: String!, $profilePhoto: String!, $coverPhoto: String!){
    setProfile(username: $username, name: $name, bio: $bio, profilePhoto: $profilePhoto, coverPhoto: $coverPhoto){
      id
      username
      name
      bio
      profilePhoto
      coverPhoto
    }
  }
`

export default (({navigation})=>{
    const {data} = navigation.state.params

    const [name,setName] = useState('')
    const [profilePhoto,setProfilePhoto] = useState('https://qiup-image.s3.amazonaws.com/profile-photo/default.jpg')

    const [setProfile] = useMutation(EDIT_PROFILE)
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
        setProfile({
          variables:{
            username: data.username,
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
                inputStyle={{fontSize:15}}
                containerStyle={{margin:20}}
                inputContainerStyle={{borderWidth:1,borderRadius:20,paddingHorizontal:15}}
                onChangeText={(text) => setName(text)}
            />
            <Button
                title='Next'
                buttonStyle={{paddingHorizontal:40,borderRadius:20}}
                onPress={handleEditProfile}
            />
        </View>
    )
})
import React from 'react';
import {View, Dimensions} from 'react-native';
import {Button, Avatar, Image, Text} from 'react-native-elements'
import {useQuery} from '@apollo/react-hooks'
import { gql } from 'apollo-boost';

const MY_PROFILE = gql`
  query{
    me{
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
  const {loading, data} = useQuery(MY_PROFILE)

  if (loading) return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>Loading....</Text>
    </View>
  )

  return (
    <View style={{flex:1}}>
      <Image
        style={{alignSelf:'stretch', height:Math.round(Dimensions.get('window').width*2/3)}}
        source={{uri: data.me.profile.coverPhoto}}
      />
      <View style={{flex:1,paddingHorizontal:15}}>
        <View style={{height:50,flexDirection:'row',alignItems:'flex-end'}}>
          <Avatar
            rounded
            size={100}
            containerStyle={{borderWidth:2, borderColor:'white'}}
            source={{uri: data.me.profile.profilePhoto}}
          />
          <View style={{flex:1,alignItems:'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>200</Text>
            <Text>Posts</Text>
          </View>
          <View style={{flex:1,alignItems:'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>200</Text>
            <Text>Followers</Text>
          </View>
          <View style={{flex:1,alignItems:'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>200</Text>
            <Text>Following</Text>
          </View>
        </View>
        <View style={{flexDirection:'row',marginTop:20}}>
          <View style={{flex:3}}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>{data.me.profile.name}</Text>
            <Text style={{color:'grey'}}>@{data.me.username}</Text>
          </View>
          <View style={{flex:2,justifyContent:'center'}}>
            <Button
              title='Edit Profile'
              type='outline'
              buttonStyle={{borderRadius:10}}
              onPress={() => navigation.navigate('EditProfile',{data})}
            />
          </View>
        </View>
        <Text style={{marginTop:20,marginBottom:20}}>{data.me.profile.bio}</Text>
      </View>
    </View>
  );
}
import React, {useEffect} from 'react';
import {View, AsyncStorage } from 'react-native';
import {Button} from 'react-native-elements'

export default ({navigation}) => {
    const checkToken = async () => {
        var token = await AsyncStorage.getItem('token')
        if (token){
            navigation.navigate('Home')
        }
    }

    useEffect(()=>{
        checkToken()
    })

    return (
        <View style={{flex:1,justifyContent:'flex-end',padding:20}}>
          <Button
            title='Login'
            type='outline'
            containerStyle={{marginBottom:15}}
            buttonStyle={{borderRadius:20}}
            onPress={() => navigation.navigate('Login')}
          />
          <Button
            title='Sign Up For FREE'
            buttonStyle={{borderRadius:20}}
            onPress={() => navigation.navigate('Register')}
          />
        </View>
  );
}
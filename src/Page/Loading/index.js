import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';

export default ({navigation}) => {
    const checkToken = async () => {
        token = await AsyncStorage.getItem('token')
        if (token){
            navigation.navigate('Home')
        } else {
            navigation.navigate('Login');
        }
    }

    useEffect(()=>{
        checkToken()
    })

    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
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
});
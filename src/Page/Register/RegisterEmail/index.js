import React, {useState} from 'react'
import {View} from 'react-native'
import {ThemeProvider, Input, Button} from 'react-native-elements'

export default (({navigation})=>{

    return(
        <View>
            <Input
                placeholder='Email'
            />
            <Button
                title='Next'
            />
        </View>
    )
})
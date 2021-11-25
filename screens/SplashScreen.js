import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import LogoSplashScreen from '../assets/LogoSplashScreen.gif'
const SplashScreen = () => {

    return (
        <View style={{ 
           flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
            }}>
                <Image source={LogoSplashScreen}/>
           
        </View>
    )
}

export default SplashScreen

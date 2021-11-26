import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import LogoSplashScreen from '../assets/splash.png'
const SplashScreen = () => {

    return (
        <View style={{ 
           flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            }}>
                <Image style={{width: '100%', height: '100%'}} source={LogoSplashScreen}/>
        </View>
    )
}

export default SplashScreen

import React from 'react'
import {View,Button, Text} from 'react-native'

function HomeScreen({route, navigation}) {  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>      
        <Button title="Go to Details " onPress={() => navigation.navigate('Details')} />      
      </View>
    );
  }

export default HomeScreen;

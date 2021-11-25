import React from 'react'
import {View,Button, Text} from 'react-native'
import AuthContext from '../contexts/Auth/AuthContext';



function HomeScreen({route, navigation}) {  
    const { signOut } = React.useContext(AuthContext);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>      
        <Button title="Go to Details " onPress={() => navigation.navigate('Details')} />      
        <Button title="Logout " onPress={() => signOut()} />      

      </View>
    );
  }

export default HomeScreen;

import React from 'react'
import {View,Text,Button} from 'react-native'


function DetailsScreen({route, navigation}) {
    React.useLayoutEffect(() => {
      navigation.setOptions({     
        headerBackVisible: true
      });
    }, [navigation]);
       
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>          
        <Text>Details Screen</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Text>Go to Custom Screen</Text> 
        <Button title="Go to custom" onPress={() => navigation.navigate('Custom')} />
      </View>
    );
    
  }

  export default DetailsScreen
import React from 'react'
import {View, Text} from 'react-native'


function CustomScreen({route, navigation}) {
  
    React.useLayoutEffect(() => {
      navigation.setOptions({      
        headerBackVisible: false
      });
    }, [navigation]);
  
    return (
           <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Custom screen</Text>
          </View>
    )
  }

  export default CustomScreen;
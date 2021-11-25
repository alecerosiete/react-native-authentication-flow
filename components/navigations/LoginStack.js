import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import SignInScreen from '../../screens/SignInScreen';

const LoginStack = () => {
    const opt =  {
        headerShown: false,
      }
    
    return (
        <Stack.Navigator >
            <Stack.Screen options={opt} name="SignIn" component={SignInScreen} />
          </Stack.Navigator>
    )
}

export default LoginStack

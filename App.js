import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


function SignInScreen({route, navigation}) {
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SignIn Screen</Text>           
    </View>
  );
}

function HomeScreen({route, navigation}) {
  const params = {
    itemId: 86,
    otherParam: 'anything you want here',
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>      
      <Button title="Go to Details " onPress={() => navigation.navigate('Details',params)} />      
    </View>
  );
}

function DetailsScreen({route, navigation}) {
  /* define estilos del header */
  React.useLayoutEffect(() => {
    navigation.setOptions({     
      headerBackVisible: true
    });
  }, [navigation]);

  /* funcion actualiza parametros enviados de la ventana anterior */
      
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>          
      <Text>Details Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Text>Go to Custom Screen</Text> 
      <Button title="Go to custom" onPress={() => navigation.navigate('Custom')} />
    </View>
  );
  
}

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





const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const AuthContext = React.createContext();

function App() {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken = "ok";

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  const StackNavStyle = {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitleAlign:'center'
  }
  return (
    /*
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Details" component={DetailsScreen} />
        <Drawer.Screen name="Custom"  component={CustomScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  
  

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={StackNavStyle}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' } }/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalle'}} />
        <Stack.Screen name="Custom"  component={CustomScreen} />
      </Stack.Navigator>
    </NavigationContainer>


  */

  <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      <Stack.Navigator>
        {state.userToken == null ? (
          <Stack.Screen name="SignIn" component={SignInScreen} />
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  </AuthContext.Provider>
  );
}


export default App;



import React, { useState } from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SecureStore from 'expo-secure-store';
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import CustomScreen from './screens/CustomScreen';
import AppLoading from './screens/SplashScreen';
import AuthReducer from './contexts/Auth/AuthReducer';
import AuthContext from './contexts/Auth/AuthContext';
import { login } from './services/api';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MARCADOR_KEY_STORAGE = "MARCADOR_KEY_STORAGE"

function App() {

  const AuthInitialState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
  }

  const [state, dispatch] = React.useReducer(AuthReducer, AuthInitialState);

  React.useEffect(() => {

    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken = null;
      let dispatchType = '';
      try {
        userToken = await SecureStore.getItemAsync(MARCADOR_KEY_STORAGE);
        console.log(userToken);
        if (!userToken) {
          console.log("usuario no existe");
          dispatchType = 'SIGN_IN';
        } else {
          console.log("usuario logueado");
          dispatchType = 'RESTORE_TOKEN';
        }
      } catch (e) {
        console.log("error atrapado", e)
        // Restoring token failed
        dispatchType = 'SIGN_OUT';
      }
      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: dispatchType, token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        let token = null;
        dispatch({ type: 'SIGNING', token: token });
        if (!data.username || !data.password) {
          alert("Ingrese sus datos");
          dispatch({ type: 'SIGN_OUT' });
        } else {
          const result = await login(data);

          if (result.status == "OK") {
            await SecureStore.setItemAsync(MARCADOR_KEY_STORAGE, JSON.stringify(result.data));
            token = result.data;
          } else {
            console.log("Usuario no se pudo autenticar: ", result);
            alert(result.message);
            token = null;
          }
        }
        dispatch({ type: 'RESTORE_TOKEN', token: token });

      },
      signOut: async (data) => {
        await SecureStore.deleteItemAsync(MARCADOR_KEY_STORAGE);
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
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
    headerTitleAlign: 'center'
  }
  console.log("en app")
  console.log(state.userToken);

  if (state.isLoading) {
    return <AppLoading />;
  }

  const opt =  {
    headerShown: false,
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>

        {state.userToken == null ? (
          <Stack.Navigator >
            <Stack.Screen options={opt} name="SignIn" component={SignInScreen} />
          </Stack.Navigator>
        ) : (
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Details" component={DetailsScreen} />
            <Drawer.Screen name="Custom" component={CustomScreen} />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}


export default App;



import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import * as SecureStore from 'expo-secure-store';


import AppLoading from './screens/SplashScreen';
import AuthReducer from './contexts/Auth/AuthReducer';
import AuthContext from './contexts/Auth/AuthContext';
import { login } from './services/api';
import AppDrawer from './components/navigations/AppDrawer';
import LoginStack from './components/navigations/LoginStack';



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
      dispatch({ type: dispatchType, token: JSON.parse(userToken) });
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

  if (state.isLoading) {
    return <AppLoading />;
  }


  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken == null ? (
          <LoginStack />
        ) : (
          <AppDrawer token={state.userToken}/>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}


export default App;



import React, { useCallback, useState } from 'react'
import { View, Button, Text } from 'react-native'
import AuthContext from '../contexts/Auth/AuthContext';
import { useFocusEffect } from '@react-navigation/native'
const MARCADOR_KEY_STORAGE = "MARCADOR_KEY_STORAGE"
import * as SecureStore from 'expo-secure-store';
const API = 'https://marcadoronline.sekur.com.py/admin.php/api';

function HomeScreen({ route, navigation }) {
  console.log("HomeScreen...")
  const { authContext, token } = React.useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  const credentials = { "username": token.user.username, "password": "pedro" }

  useFocusEffect(
    useCallback(() => {
      /* ver aqui para llamar a la api y obtener los datos */
      console.log("en HOME")
      fetch(`${API}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 'Accept': 'application/json',
          'X-API-KEY': '7b16fbfb5cd3328df243a9a2322da9458d60d9c1'
        },
        body: JSON.stringify(credentials)
      })
        .then((response) => response.json())
        .then(async (json) => {


          if (json.status == "OK") {
            await SecureStore.setItemAsync(MARCADOR_KEY_STORAGE, JSON.stringify(json.data));
            setProfile(json.data)

          } else {
            console.log("error: ", json);
            authContext.signOut()
          }

        })
        .catch((error) => {
          console.error(error);
        });

    }, [])
  );

  if (!profile) {
    return (<View />)
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hola {profile.user.fullname}</Text>
      <Button title="Go to Perfil " onPress={() => navigation.navigate('Perfil')} />
      <Button title="Logout " onPress={() => authContext.signOut()} />
    </View>
  );
}

export default HomeScreen;

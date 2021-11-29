import React, { useState, useCallback } from 'react'
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { getUser } from '../services/api'
import AuthContext from '../contexts/Auth/AuthContext';
import { useFocusEffect } from '@react-navigation/native'
import AuthReducer from '../contexts/Auth/AuthReducer';



const MARCADOR_KEY_STORAGE = "MARCADOR_KEY_STORAGE"
const API = 'https://marcadoronline.sekur.com.py/admin.php/api';

const ProfileScreen = ({ navigation, route }) => {
    const [profile, setProfile] = useState(false);
    const { authContext, token } = React.useContext(AuthContext);
    const [loading, setLoading] = useState(false);


    const credentials = { "username": token.user.username, "password": "pedro" }

    useFocusEffect(
        useCallback(() => {
            
            console.log("use effect en profile...");
            fetch(`${API}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 'Accept': 'application/json',
                    'X-API-KEY': '7b16fbfb5cd3328df243a9a2322da9458d60d9c1'
                },
                body: JSON.stringify(credentials)
            })
                .then((response) => response.json())
                .then( async (json) => {
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
    )

    if (!profile) {

        return <View><Text>Cargando..</Text></View>;
    } else {
       
        return (
            <View>
                <ImageBackground source={require('../assets/header_image.jpg')} style={styles.header}>
                    <Image source={{ uri: profile.user.avatar }} style={styles.profileImage} />
                    <Text style={styles.profileTitle}>{profile.user.fullname}</Text>
                    <Text style={styles.profileSubTitle}>{profile.user.email}</Text>
                </ImageBackground>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontFamily: 'roboto-bold'
    },
    profileSubTitle: {
        color: '#ffffff',
        fontSize: 14,
        fontFamily: 'roboto-light'
    },
    header: {
        padding: 20,
        alignItems: 'center'
    },

})

export default ProfileScreen

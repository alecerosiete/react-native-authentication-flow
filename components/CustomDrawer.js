import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import * as Font from 'expo-font'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthContext from '../contexts/Auth/AuthContext';
import { useFocusEffect } from '@react-navigation/core';
import * as SecureStore from 'expo-secure-store';
const MARCADOR_KEY_STORAGE = "MARCADOR_KEY_STORAGE"
const API = 'https://marcadoronline.sekur.com.py/admin.php/api';

const CustomDrawer = (props) => {
    console.log("en custom drawer ... ")
    const { authContext, token } = React.useContext(AuthContext);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [profile, setProfile] = useState(null);
    //console.log("token de props> ",props.profile)
    //console.log("token de useContext> ",token)



    const credentials = { "username": token.user.username, "password": "pedro" }



    useFocusEffect(
        useCallback( () => {
            if (!fontsLoaded) {
                loadFonts();
            }

            const get = async () => {
                const userToken = await SecureStore.getItemAsync(MARCADOR_KEY_STORAGE);
                if (!userToken) {
                    console.log("usuario no existe");
                    
                  } else {
                   
                   setProfile(JSON.parse(userToken));
                  
                  }
                
            }
            get();
            /*fetch(`${API}/login`, {
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
                });*/
        }, [])
    )

    const loadFonts = async () => {
        await Font.loadAsync({
            'roboto-light': require('../assets/fonts/roboto/Roboto-Light.ttf'),
            'roboto-regular': require('../assets/fonts/roboto/Roboto-Regular.ttf'),
            'roboto-bold': require('../assets/fonts/roboto/Roboto-Bold.ttf'),
        })
        setFontsLoaded(true);
    }

    
    if (!fontsLoaded) {
        return (
            <View />
        );
    }

    if (!profile) {
        return (
            <View />
        );
    }
    //console.log("aqui",token.user)

    //var profile = props.profile.data;
    //var profile = token.user;

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}  >
                <ImageBackground source={require('../assets/header_image.jpg')} style={{ padding: 20 }}>
                    <Image source={{ uri: profile.user.avatar }} style={styles.profileImage} />
                    <Text style={styles.profileTitle}>{profile.user.fullname}</Text>
                    <Text style={styles.profileSubTitle}>{profile.user.email}</Text>
                </ImageBackground>
                <View style={styles.menuContent} >
                    <DrawerItemList {...props} style={styles.menuList}></DrawerItemList>
                </View>
            </DrawerContentScrollView>
            <View style={styles.menuFooter}>
                <TouchableOpacity onPress={() => { authContext.signOut() }} style={{ paddingVertical: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="exit-outline" size={24} />
                        <Text style={{ fontSize: 15, fontFamily: 'roboto-bold', marginLeft: 5 }}>Cerrar Sesion</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { props.navigation.navigate("Empleados") }} style={{ paddingVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontFamily: 'roboto-light', marginLeft: 5 }}>www.relojmarcador.com</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10
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
    menuContent: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 10,
    },
    menuList: {
        /*backgroundColor: '#ffe393'*/
    },
    menuFooter: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        paddingTop: 10,

    }
})

export default CustomDrawer

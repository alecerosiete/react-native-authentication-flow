import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../../screens/HomeScreen';
import CustomScreen from '../../screens/CustomScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import CustomDrawer from '../../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Font from 'expo-font'
import { useFocusEffect } from '@react-navigation/core';

const Drawer = createDrawerNavigator();

const AppDrawer = (params) => {
    console.log("AppDrawer...")
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        console.log("useEffect... en appdrawer")
        if (!fontsLoaded) {
            loadFonts();
        }
        console.log("Entering")
    },[params])

    useFocusEffect(
        useCallback( () => {

            console.log("Entering")
           
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
            'roboto-light': require('../../assets/fonts/roboto/Roboto-Light.ttf'),
            'roboto-regular': require('../../assets/fonts/roboto/Roboto-Regular.ttf'),
            'roboto-bold': require('../../assets/fonts/roboto/Roboto-Bold.ttf'),
        })
        setFontsLoaded(true);
    }

    if (!fontsLoaded) {
        return (
            <View />
        );
    }
   
    const profile = {
        data: params.token.user,
        usergroups: params.token.user_group
    }

    const screenOptions = {
        headerShown: true,
        drawerLabelStyle: {
            marginLeft: -20,
            fontFamily: 'roboto-bold',
            fontSize: 15
        },
        drawerActiveBackgroundColor: "#26bdd7",
        drawerActiveTintColor: "#ffffff"
    }

    const check_role = (role) => {
        return parseInt(params.token.user_group[role]) ;
    }

    return (
        <Drawer.Navigator initialRouteName="Home"
            drawerContent={ props => <CustomDrawer {...props} profile={profile} /> }
            screenOptions={screenOptions}
        >
            <Drawer.Screen name="Inicio" component={HomeScreen} options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={24} color={color} />
                    )
            }} />
            {check_role('role_admin') ? (
            <>
                <Drawer.Screen name="Empleados" component={CustomScreen} options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="people-outline" size={24} color={color} />
                    )
                }} />
          
                <Drawer.Screen name="Empresas" component={CustomScreen} options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="briefcase-outline" size={24} color={color} />
                    )
                }} />
            </>
            ) : (
           
            (check_role('role_manager') ? (
                <>
                <Drawer.Screen name="Empleados" component={CustomScreen} options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="people-outline" size={24} color={color} />
                    )
                }} />
                </>
            ) : (
                <></>
            ))              
           
            )}
            <Drawer.Screen name="Marcaciones" component={CustomScreen} options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="finger-print-outline" size={24} color={color} />
                )
            }} />
            <Drawer.Screen name="Perfil" component={ProfileScreen} options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="person-outline" size={24} color={color} />
                )
            }} />
        </Drawer.Navigator>
    )
}

export default AppDrawer

import React,{ useEffect, useState } from 'react'
import {View} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../../screens/HomeScreen';
import DetailsScreen from '../../screens/DetailsScreen';
import CustomScreen from '../../screens/CustomScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import CustomDrawer from '../../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Font from 'expo-font'


const Drawer = createDrawerNavigator();

const AppDrawer = (params) => {

    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() =>{
        if(!fontsLoaded){
            loadFonts();
        }        
    })

    const loadFonts = async ( ) => {
        await Font.loadAsync({
            'roboto-light': require('../../assets/fonts/roboto/Roboto-Light.ttf'),
            'roboto-regular': require('../../assets/fonts/roboto/Roboto-Regular.ttf'),
            'roboto-bold': require('../../assets/fonts/roboto/Roboto-Bold.ttf'),
        })
        setFontsLoaded(true);
    }

    if(!fontsLoaded){
        return (
            <View />
        );
    }


    var profile = params.token;
    if(profile){        
        var profile = {
            data: profile.user
        }
    }else {
        profile = null;
    }
    

    return (
        <Drawer.Navigator initialRouteName="Home" 
        drawerContent = {
            props => <CustomDrawer {...props} profile={profile}/>}
            screenOptions = {
                {
                    headerShown:true, 
                    drawerLabelStyle: {
                        marginLeft:-20,
                        fontFamily: 'roboto-bold',
                        fontSize: 15
                    },
                    drawerActiveBackgroundColor:"#26bdd7",
                    drawerActiveTintColor: "#ffffff"
                }
            } >
            <Drawer.Screen  name="Inicio" component={HomeScreen} options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="home-outline" size={24} color={color} />
                )
            }} />
            <Drawer.Screen name="Empleados" component={CustomScreen} options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="people-outline" size={24} color={color} />
                    )
            }}/>
            <Drawer.Screen name="Empresas" component={CustomScreen} options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="briefcase-outline" size={24} color={color} />
                )
            }}/>
             <Drawer.Screen name="Marcaciones" component={CustomScreen} options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="finger-print-outline" size={24} color={color} />
                )
            }}/>
            <Drawer.Screen name="Perfil" component={ProfileScreen} options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="person-outline" size={24} color={color} />
                )
            }}/> 
           
        </Drawer.Navigator>
    )
}

export default AppDrawer

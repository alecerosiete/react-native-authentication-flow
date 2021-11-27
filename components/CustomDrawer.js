import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image,TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import * as Font from 'expo-font'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthContext from '../contexts/Auth/AuthContext';

const CustomDrawer = (props) => {

    const { signOut } = React.useContext(AuthContext);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() =>{
        if(!fontsLoaded){
            loadFonts();
        }        
    })

    const loadFonts = async ( ) => {
        await Font.loadAsync({
            'roboto-light': require('../assets/fonts/roboto/Roboto-Light.ttf'),
            'roboto-regular': require('../assets/fonts/roboto/Roboto-Regular.ttf'),
            'roboto-bold': require('../assets/fonts/roboto/Roboto-Bold.ttf'),
        })
        setFontsLoaded(true);
    }

    if(!fontsLoaded){
        return (
            <View />
        );
    }

    var profile = props.profile.data;
    console.log(props);
    return (
      <View style={{flex:1}}>
        <DrawerContentScrollView {...props}  >
            <ImageBackground source={require('../assets/header_image.jpg')} style={{ padding: 20 }}>
                <Image source={{ uri: profile.avatar }} style={styles.profileImage} />
                <Text style={styles.profileTitle}>{profile.fullname}</Text>
                <Text style={styles.profileSubTitle}>{profile.email}</Text>
            </ImageBackground>
            <View style={styles.menuContent} >
                <DrawerItemList {...props} style={styles.menuList}></DrawerItemList>
            </View>
        </DrawerContentScrollView>
        <View style={styles.menuFooter}>
            <TouchableOpacity onPress={() => {signOut()}} style= {{paddingVertical: 10}}>
                <View style={{flexDirection:"row",alignItems: "center"}}>
                <Ionicons name="exit-outline" size={24} />
                <Text style={{fontSize:15, fontFamily: 'roboto-bold',marginLeft: 5}}>Cerrar Sesion</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {props.navigation.navigate("Empleados")}} style= {{paddingVertical: 10}}>
                <Text style={{fontSize:15, fontFamily: 'roboto-light',marginLeft: 5}}>www.relojmarcador.com</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        width:100,
        height:100,
        borderRadius:50,
        marginBottom:10
    },
    profileTitle: {
        color:'#ffffff',        
        fontSize:18,
        fontFamily:'roboto-bold'
    },
    profileSubTitle: {
        color:'#ffffff',
        fontSize:14,
        fontFamily:'roboto-light'
    },
    menuContent: {
        flex:1,
        backgroundColor:"#fff",
        paddingTop: 10,  
    },
    menuList :{
        /*backgroundColor: '#ffe393'*/
    },
    menuFooter: {
        padding:20,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        paddingTop: 10,
        
    }
})

export default CustomDrawer

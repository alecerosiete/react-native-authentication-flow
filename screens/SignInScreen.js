import React, { useEffect } from 'react';
import { TextInput, View, Button, StyleSheet, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AuthContext from '../contexts/Auth/AuthContext';
import * as Font from 'expo-font'

function SignInScreen({ route, navigation }) {
  const LOGO = '../assets/loginIcon.png'

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);
  
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  useEffect(() =>{
      if(!fontsLoaded){
          loadFonts();
      }        
  },[])

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

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/*<Image source={require('../assets/loginIcon.png')} style={styles.logo} />*/}
        <Text style={styles.title}>Marcador<Text style={styles.titleBold}>Online</Text></Text>
       
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          returnKeyType="next"
          /*onSubmitEditing={() => this.passwordInput.focus()}*/
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          returnkeytype="go"
          /*ref={(input) => this.passwordInput }*/
        />
        <TouchableOpacity style={styles.buttonContainer} title="Sign in" onPress={() => signIn({ username, password })} >
          <Text style={styles.buttonText}>ACCEDER</Text>
        </TouchableOpacity>

      </View>
      <View>
        <Text style={styles.footer}>www.relojmarcador.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d2dae2",
    
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    color: "#fff",
    marginTop: 10,
    fontSize: 22,
    width: 160,
    textAlign: 'center',
    opacity: 0.9,

  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginBottom: 20,
    color: "#535c68",
    fontSize:16,
    paddingHorizontal: 10,
    borderRadius:5
  },
  formContainer: {
    padding: 10,
    paddingBottom: 200,
    paddingTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  buttonContainer: {
    backgroundColor:'#e67e22',
    paddingVertical:15
  },
  buttonText: {
    textAlign: 'center',
    color:'#ffffff',
    fontWeight: 'bold',
  },

  footer: {
    textAlign: 'center',
    color:'#ffffff',
    fontWeight: 'bold',
    marginBottom:10,
  },
  titleBold:{
    fontWeight: 'bold',
    color:'#000',
  }
})

export default SignInScreen;





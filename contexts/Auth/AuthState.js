import React from 'react'
import AuthReducer from '../Auth/AuthReducer'
import AuthContext from '../Auth/AuthContext'
import axios from "axios";

const AuthState = (props) => {
   

    /* algunas funciones de login */

    const signIn = async (login) => {
        console.log("in login authstate")
        console.log(login)
        const users = await axios.get('https://reqres.in/api/users');
        dispatch({
            type:'SIGN_IN',
            token: 'dummy-auth-token' 
        })
        
    }

    const restore_token = async (user,pass) => {
        const users = await axios.get('https://reqres.in/api/users');
        dispatch({
            type:'RESTORE_TOKEN',
            token: users.data.data
        })
    }

    const signOut = async (user,pass) => {
        const users = await axios.get('https://reqres.in/api/users');
        dispatch({
            type:'SIGN_OUT',
            token: users.data.data
        })
    }

    console.log("antes de return del context");
    console.log(state.userToken);

    return (
        <AuthContext.Provider value={{
            isLoading: state.isLoading,
            isSignout: state.isSignout,
            userToken: state.userToken,
            signIn,
            signOut,
            restore_token
        }}>
             {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState


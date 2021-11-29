import { RESTORE_TOKEN, SIGN_OUT, SIGN_IN } from '../ContextTypes'

const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            console.log('in auth reducer restore token',action.tokens)
            return {
                ...state,
                userToken: action.token,
                isLoading: false,

            };
        case 'SIGN_IN':
            console.log("in authreducer sign in..")
            
            return {
                ...state,
                isSignout: false,
                userToken: action.token,
                isLoading: false,
                
            };
        case 'SIGN_OUT':
            console.log("in authreducer  sign out")
            return {
                ...state,
                isSignout: true,
                userToken: null,
                isLoading: false,
                
            };
        case 'SIGNING':
            console.log("in authreducer  SINGIN")
            return {
                ...state,
                isSignout: true,
                userToken: null,
                isLoading: true,
                
            };
    }

}

export default AuthReducer;
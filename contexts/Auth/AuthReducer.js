import { RESTORE_TOKEN, SIGN_OUT, SIGN_IN } from '../ContextTypes'

const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            return {
                ...state,
                userToken: action.token,
                isLoading: false,
            };
        case 'SIGN_IN':
            console.log("in reducer")
            console.log(action.token)
            return {
                ...state,
                isSignout: false,
                userToken: action.token,
            };
        case 'SIGN_OUT':
            return {
                ...state,
                isSignout: true,
                userToken: null,
            };
    }

}

export default AuthReducer;
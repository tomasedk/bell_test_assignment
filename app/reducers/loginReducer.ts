import { AsyncActionTypes, LoginActionTypes } from '../HelpingFolder/Consts';
import { IActionType, IStoreLoginState } from '../HelpingFolder/Interfaces';

const initialState = {
    get state(): IStoreLoginState {
        return {
            loginStatus: false,
            loading: false,

            userData: {
                nickname: '',
                password: ''
            }
        }
    }
}

export default function loginReducer(state: IStoreLoginState = initialState.state, action: IActionType) {
    //console.log('loginReducer.jsx. Action: ', action, ' State: ', state);

    switch (action.type) {
        case LoginActionTypes.CLICK:
            return {
                ...state,
                data: (state.data || 0) + 1,
            };

        case `${LoginActionTypes.LOGIN}${AsyncActionTypes.BEGIN}`:
            return {
                ...state,
                loading: true,
            };

        case `${LoginActionTypes.LOGIN}${AsyncActionTypes.SUCCESS}`:
            //console.log('inStore', action.payload.userNP);
            return {
                ...state,
                loginStatus: action.payload.data.authorized,
                userData: action.payload.userNP,
                loading: false,
            };

        case `${LoginActionTypes.LOGIN}${AsyncActionTypes.FAILURE}`:
            return {
                ...state,
                loading: false,
                loginStatus: false,
            };

        case LoginActionTypes.LOGOUT:
            return {
                ...state,
                loginStatus: false,
                userData: {
                    nickname: '',
                    password: ''
                }
            };
    }
    return state;
}

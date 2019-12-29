import * as authActionType from '../actionTypes/authActionType';

const initialState = {
    isAuth: false
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case authActionType.SET_AUTHENTICATE:
            return { ...state, isAuth: action.payload };
        default:
            return state;
    }
}
import * as authActionType from '../actionTypes/authActionType';

export const setAuthenticate = (payload) => ({
    type: authActionType.SET_AUTHENTICATE,
    payload: payload
});

import { createAction } from "redux-actions";

export const postRegistrationRequest = createAction("POST_REGISTRATION_REQUEST")
export const postRegistrationSuccess = createAction("POST_REGISTRATION_SUCCESS")
export const postRegistrationFailure = createAction("POST_REGISTRATION_FAILURE")

export const postLoginRequest = createAction("POST_LOGIN_REQUEST")
export const postLoginSuccess = createAction("POST_LOGIN_SUCCESS")
export const postLoginFailure = createAction("POST_LOGIN_FAILURE")

export const changePasswordRequest = createAction("CHANGE_PASSWORD_REQUEST")
export const changePasswordSuccess = createAction("CHANGE_PASSWORD_SUCCESS")
export const changePasswordFailure = createAction("CHANGE_PASSWORD_FAILURE")

export const getUserRequest = createAction("GET_USER_REQUEST")
export const getUserSuccess = createAction("GET_USER_SUCCESS")
export const getUserFailure = createAction("GET_USER_FAILURE")

export const changeUserData = createAction("CHANGE_USER_DATA")
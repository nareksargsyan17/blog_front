import {handleActions} from "redux-actions";
import {
  postRegistrationRequest,
  postRegistrationSuccess,
  postRegistrationFailure,
  getVerificationRequest,
  getVerificationSuccess,
  getVerificationFailure,
  postLoginRequest,
  postLoginSuccess,
  postLoginFailure,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
  getUserRequest,
  getUserSuccess,
  getUserFailure
} from './actions'

const defaultState = {
  isPostRegistrationRequest: false,
  isPostRegistrationSuccess: false,
  isPostRegistrationFailure: false,
  isGetVerificationRequest: false,
  isGetVerificationSuccess: false,
  isGetVerificationFailure: false,
  isPostLoginRequest: false,
  isPostLoginSuccess: false,
  isPostLoginFailure: false,
  isChangePasswordRequest: false,
  isChangePasswordSuccess: false,
  isChangePasswordFailure: false,
  isGetUserRequest: false,
  isGetUserSuccess: false,
  isGetUserFailure: false,
  userData: {},
  successMessage: "",
  errorMessage: '',
  role: null
}

const reducer = handleActions(
  {
    [postRegistrationRequest]: (
      state
    ) => ({
      ...state,
      isPostRegistrationRequest: true,
      isPostRegistrationSuccess: false,
      isPostRegistrationFailure: false,
    }),
    [postRegistrationSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isPostRegistrationRequest: false,
      isPostRegistrationSuccess: true,
      isPostRegistrationFailure: false,
      successMessage: payload,
    }),
    [postRegistrationFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isPostRegistrationRequest: false,
      isPostRegistrationSuccess: false,
      isPostRegistrationFailure: true,
      errorMessage: payload
    }),
    [getVerificationRequest]: (
      state
    ) => ({
      ...state,
      isGetVerificationRequest: true,
      isGetVerificationSuccess: false,
      isGetVerificationFailure: false,
    }),
    [getVerificationSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isGetVerificationRequest: false,
      isGetVerificationSuccess: true,
      isGetVerificationFailure: false,
      successMessage: payload,
    }),
    [getVerificationFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isGetVerificationRequest: false,
      isGetVerificationSuccess: false,
      isGetVerificationFailure: true,
      errorMessage: payload
    }),
    [postLoginRequest]: (
      state
    ) => ({
      ...state,
      isPostLoginRequest: true,
      isPostLoginSuccess: false,
      isPostLoginFailure: false,
    }),
    [postLoginSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isPostLoginRequest: false,
      isPostLoginSuccess: true,
      isPostLoginFailure: false,
      userData: payload,
    }),
    [postLoginFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isPostLoginRequest: false,
      isPostLoginSuccess: false,
      isPostLoginFailure: true,
      errorMessage: payload
    }),
    [changePasswordRequest]: (
      state
    ) => ({
      ...state,
      isChangePasswordRequest: true,
      isChangePasswordSuccess: false,
      isChangePasswordFailure: false,
    }),
    [changePasswordSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isChangePasswordRequest: false,
      isChangePasswordSuccess: true,
      isChangePasswordFailure: false,
      successMessage: payload,
    }),
    [changePasswordFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isChangePasswordRequest: false,
      isChangePasswordSuccess: false,
      isChangePasswordFailure: true,
      errorMessage: payload
    }),
    [getUserRequest]: (
      state
    ) => ({
      ...state,
      isGetUserRequest: true,
      isGetUserSuccess: false,
      isGetUserFailure: false,
    }),
    [getUserSuccess]: (
      state,
      { payload },
    ) => ({
      ...state,
      isGetUserRequest: false,
      isGetUserSuccess: true,
      isGetUserFailure: false,
      role: payload,
    }),
    [getUserFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isGetUserRequest: false,
      isGetUserSuccess: false,
      isGetUserFailure: true,
      errorMessage: payload
    }),
  },
  defaultState
);

export default reducer
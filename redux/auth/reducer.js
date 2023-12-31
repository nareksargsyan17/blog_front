import {handleActions} from "redux-actions";
import {
   postRegistrationRequest,
   postRegistrationSuccess,
   postRegistrationFailure,
   postLoginRequest,
   postLoginSuccess,
   postLoginFailure,
   changePasswordRequest,
   changePasswordSuccess,
   changePasswordFailure,
   getUserRequest,
   getUserSuccess,
   getUserFailure,
   changeUserData,
   getUserByIdRequest,
   getUserByIdSuccess,
   getUserByIdFailure,
   editUserRequest,
   editUserSuccess,
   editUserFailure
} from './actions'

const defaultState = {
   isPostRegistrationRequest: false,
   isPostRegistrationSuccess: false,
   isPostRegistrationFailure: false,
   isPostLoginRequest: false,
   isPostLoginSuccess: false,
   isPostLoginFailure: false,
   isChangePasswordRequest: false,
   isChangePasswordSuccess: false,
   isChangePasswordFailure: false,
   isGetUserRequest: false,
   isGetUserSuccess: false,
   isGetUserFailure: false,
   isGetUserByIdRequest: false,
   isGetUserByIdSuccess: false,
   isGetUserByIdFailure: false,
   isEditUserRequest: false,
   isEditUserSuccess: false,
   isEditUserFailure: false,
   isLogged: "",
   userData: {},
   successMessage: "",
   errorMessage: '',
   user: null,
   gottenUser: null,
   updated: null
}

const reducer = handleActions(
   {
      [changeUserData]: (
         state,
         {payload}
      ) => ({
         ...state,
         user: payload
      }),
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
         {payload},
      ) => ({
         ...state,
         isPostRegistrationRequest: false,
         isPostRegistrationSuccess: true,
         isPostRegistrationFailure: false,
         successMessage: payload,
      }),
      [postRegistrationFailure]: (
         state,
         {payload}
      ) => ({
         ...state,
         isPostRegistrationRequest: false,
         isPostRegistrationSuccess: false,
         isPostRegistrationFailure: true,
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
         {payload},
      ) => ({
         ...state,
         isPostLoginRequest: false,
         isPostLoginSuccess: true,
         isPostLoginFailure: false,
         userData: payload,
      }),
      [postLoginFailure]: (
         state,
         {payload}
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
         {payload},
      ) => ({
         ...state,
         isChangePasswordRequest: false,
         isChangePasswordSuccess: true,
         isChangePasswordFailure: false,
         successMessage: payload,
      }),
      [changePasswordFailure]: (
         state,
         {payload}
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
         {payload},
      ) => ({
         ...state,
         isGetUserRequest: false,
         isGetUserSuccess: true,
         isGetUserFailure: false,
         user: payload,
      }),
      [getUserFailure]: (
         state,
         {payload}
      ) => ({
         ...state,
         isGetUserRequest: false,
         isGetUserSuccess: false,
         isGetUserFailure: true,
         errorMessage: payload
      }),
      [editUserRequest]: (
         state
      ) => ({
         ...state,
         isEditUserRequest: true,
         isEditUserSuccess: false,
         isEditUserFailure: false,
      }),
      [editUserSuccess]: (
         state,
         {payload},
      ) => ({
         ...state,
         isEditUserRequest: false,
         isEditUserSuccess: true,
         isEditUserFailure: false,
         updated: payload,
      }),
      [editUserFailure]: (
         state,
         {payload}
      ) => ({
         ...state,
         isEditUserRequest: false,
         isEditUserSuccess: false,
         isEditUserFailure: true,
         errorMessage: payload
      }),
      [getUserByIdRequest]: (
         state
      ) => ({
         ...state,
         isGetUserByIdRequest: true,
         isGetUserByIdSuccess: false,
         isGetUserByIdFailure: false,
      }),
      [getUserByIdSuccess]: (
         state,
         {payload},
      ) => ({
         ...state,
         isGetUserByIdRequest: false,
         isGetUserByIdSuccess: true,
         isGetUserByIdFailure: false,
         gottenUser: payload,
      }),
      [getUserByIdFailure]: (
         state,
         {payload}
      ) => ({
         ...state,
         isGetUserByIdRequest: false,
         isGetUserByIdSuccess: true,
         isGetUserByIdFailure: false,
         errorMessage: payload
      }),
   },
   defaultState
);

export default reducer
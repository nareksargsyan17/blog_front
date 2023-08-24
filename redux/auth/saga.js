import {
  postRegistrationRequest,
  postRegistrationSuccess,
  postRegistrationFailure,
  postLoginSuccess,
  postLoginFailure,
  postLoginRequest,
  changePasswordSuccess,
  changePasswordFailure,
  changePasswordRequest,
  getUserSuccess,
  getUserFailure,
  getUserRequest,
  getUserByIdSuccess,
  getUserByIdFailure,
  getUserByIdRequest,
  editUserRequest,
  editUserSuccess,
  editUserFailure
} from './actions'
import { instance } from "../../configs/axiosInstance";
import { put, takeLatest } from "redux-saga/effects";


function* registration(action) {
  try {

    const response = yield instance({
      method: "post",
      url: "/guest/user/registration",
      data : action.payload
    })

    if (response.status === 200) {
      yield put(postRegistrationSuccess(response.data.successMessage));
    } else {
      yield put(postRegistrationFailure(response.data.message));
    }
  } catch (error) {
      yield put(postRegistrationFailure(error.response.data.message || error.message));
  }
}



function* login(action) {
  try {
    const response = yield instance({
      method: "post",
      url: "/guest/user/login",
      data : action.payload
    })

    if (response.status === 200) {
      yield put(postLoginSuccess(response.data.data));
    } else {
      yield put(postLoginFailure(response.data.message));
    }
  } catch (error) {
    yield put(postLoginFailure(error.message));
  }
}

function* changePassword(action) {
  try {
    const response = yield instance({
      method: "put",
      url: "/auth/user/change_pass",
      headers: {
        'Accept': 'application/json',
      },
      data : action.payload.data
    })
    if (response.status === 200) {
      yield put(changePasswordSuccess(response.data.successMessage));
    } else {
      yield put(changePasswordFailure(response.data.message));
    }
  } catch (error) {
    yield put(changePasswordFailure(error.message));
  }
}

function* getUser() {
  try {
    const response = yield instance({
      method: "get",
      url: "/auth/user/get/user",
    })

    if (response.status === 200) {
      yield put(getUserSuccess(response.data.data));
    } else {
      yield put(getUserFailure(response.data.message));
    }
  } catch (error) {
    yield put(getUserFailure(error.message));
  }
}

function* editUser({ payload }) {
  try {
    const response = yield instance({
      method: "put",
      url: "/auth/user/edit",
      data: payload
    })
    if (response.status === 200) {
      yield put(editUserSuccess(response.data.data));
    } else {
      yield put(editUserFailure(response.data.message));
    }
  } catch (error) {
    yield put(editUserFailure(error.message));
  }
}

function* getUserById({ payload }) {
  try {
    const response = yield instance({
      method: "get",
      url: `/guest/user/get/${payload}`,
    })
    if (response.status === 200) {
      yield put(getUserByIdSuccess(response.data.data));
    } else {
      yield put(getUserByIdFailure(response.data.message));
    }
  } catch (error) {
    yield put(getUserByIdFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(postRegistrationRequest, registration);
  yield takeLatest(postLoginRequest, login);
  yield takeLatest(changePasswordRequest, changePassword);
  yield takeLatest(getUserRequest, getUser);
  yield takeLatest(editUserRequest, editUser);
  yield takeLatest(getUserByIdRequest, getUserById);
}
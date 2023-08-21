import {
  getPostsRequest,
  getPostsSuccess,
  getPostsFailure,
  addPostsSuccess,
  addPostsFailure,
  addPostsRequest,
  uploadPostImageSuccess,
  uploadPostImageFailure,
  uploadPostImageRequest,
  likePostsSuccess,
  likePostsFailure,
  likePostsRequest,
  getPostByIdSuccess,
  getPostByIdFailure,
  getPostByIdRequest
} from './actions'
import {instance} from "../../configs/axiosInstance";
import {put, takeLatest} from "redux-saga/effects";


function* getPosts({ payload }) {
  try {
    const response = yield instance({
      method: "get",
      url: `/guest/post/get_all?page=${payload}`,
    })
    if (response.status === 200) {
      yield put(getPostsSuccess(response.data.data));
    } else {
      yield put(getPostsFailure(response.data.message));
    }
  } catch (error) {
    console.log('error---', error);
      yield put(getPostsFailure(error.response.data.message || error.message));
  }
}

function* addPost({ payload }) {
  try {
    const response = yield instance.post(`/auth/post/add`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    if (response.status === 200) {
      yield put(addPostsSuccess(response.data.data));
    } else {
      yield put(addPostsFailure(response.data.message));
    }
  } catch (error) {
    console.log('error---', error);
    yield put(addPostsFailure(error.response.data.message || error.message));
  }
}

function* uploadPostImage({ payload }) {
  try {
    const response = yield instance.post(`/auth/post/upload/${payload.id}`, payload.formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    if (response.status === 200) {
      yield put(uploadPostImageSuccess(response.data.data));
    } else {
      yield put(uploadPostImageFailure(response.data.message));
    }
  } catch (error) {
    console.log('error---', error);
    yield put(uploadPostImageFailure(error.response.data.message || error.message));
  }
}

function* likePost({ payload }) {
  console.log(payload)
  try {
    const response = yield instance({
      method: "post",
      url: `/auth/like/add/${payload}`
    })
    console.log(response)
    if (response.status === 200) {
      yield put(likePostsSuccess(response.data.successMessage));
    } else {
      yield put(likePostsFailure(response.data.message));
    }
  } catch (error) {
    console.log('error---', error);
    yield put(likePostsFailure(error.response.data.message || error.message));
  }
}

function* getPostById({ payload }) {
  try {
    console.log(payload)
    const response = yield instance({
      method: "get",
      url: `/guest/post/get${payload}`,
    })
    console.log(response.data)
    if (response.status === 200) {
      yield put(getPostByIdSuccess(response.data.data));
    } else {
      yield put(getPostByIdFailure(response.data.message));
    }
  } catch (error) {
    console.log('error---', error);
    yield put(getPostByIdFailure(error.response.data.message || error.message));
  }
}

export default function* postSaga() {
  yield takeLatest(getPostsRequest, getPosts);
  yield takeLatest(addPostsRequest, addPost);
  yield takeLatest(uploadPostImageRequest, uploadPostImage);
  yield takeLatest(likePostsRequest, likePost);
  yield takeLatest(getPostByIdRequest, getPostById);

}
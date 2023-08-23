import {
  addCommentsFailure, addCommentsRequest,
  addCommentsSuccess,
  getCommentsFailure, getCommentsRequest,
  getCommentsSuccess

} from './actions'
import {instance} from "../../configs/axiosInstance";
import {put, takeLatest} from "redux-saga/effects";


function* getComments({ payload }) {
  try {
    const response = yield instance({
      method: "get",
      url: `/guest/comment/get/${payload.postId}?parent=${payload.parentId}`,
    })
    if (response.status === 200) {
      yield put(getCommentsSuccess(response.data.data));
    } else {
      yield put(getCommentsFailure(response.data.message));
    }
  } catch (error) {
      yield put(getCommentsFailure(error.response.data.message || error.message));
  }
}

function* addComment({ payload }) {
  try {
    const response = yield instance({
      method: "post",
      url: `/auth/comment/add`,
      data: payload
    })

    if (response.status === 200) {
      yield put(addCommentsSuccess(response.data.data));
    } else {
      yield put(addCommentsFailure(response.data.message));
    }
  } catch (error) {
    console.log('error---', error);
    yield put(addCommentsFailure(error.response.data.message || error.message));
  }
}



export default function* commentSaga() {
  yield takeLatest(getCommentsRequest, getComments);
  yield takeLatest(addCommentsRequest, addComment);
}
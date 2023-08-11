import {
  getPostsRequest,
  getPostsSuccess,
  getPostsFailure
} from './actions'
import {instance} from "../../configs/axiosInstance";
import {put, takeEvery} from "redux-saga/effects";


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


export default function* postSaga() {
  yield takeEvery(getPostsRequest, getPosts);

}
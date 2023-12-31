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
   getPostByIdRequest,
   getUserPostsSuccess,
   getUserPostsFailure,
   getUserPostsRequest,
   getUserLikedPostsSuccess,
   getUserLikedPostsFailure,
   getUserLikedPostsRequest,
   editPostsSuccess,
   editPostsFailure,
   editPostsRequest,
   deletePostsSuccess,
   deletePostsFailure,
   deletePostsRequest
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
      yield put(uploadPostImageFailure(error.response.data.message || error.message));
   }
}

function* likePost({ payload }) {
   try {
      const response = yield instance({
         method: "post",
         url: `/auth/like/add/${payload}`
      })

      if (response.status === 200) {
         yield put(likePostsSuccess(response.data.successMessage));
      } else {
         yield put(likePostsFailure(response.data.message));
      }
   } catch (error) {
      yield put(likePostsFailure(error.response.data.message || error.message));
   }
}

function* getPostById({payload}) {
   try {

      const response = yield instance({
         method: "get",
         url: `/guest/post/get/${payload}`,
      })

      if (response.status === 200) {
         yield put(getPostByIdSuccess(response.data.data));
      } else {
         yield put(getPostByIdFailure(response.data.message));
      }
   } catch (error) {
      yield put(getPostByIdFailure(error.response.data.message || error.message));
   }
}

function* getUserPosts({ payload }) {
   try {
      const response = yield instance({
         method: "get",
         url: `/guest/post/get/${payload.id}/posts?page=${payload.page}`,
      })
      if (response.status === 200) {
         yield put(getUserPostsSuccess(response.data.data));
      } else {
         yield put(getUserPostsFailure(response.data.message));
      }
   } catch (error) {
      yield put(getUserPostsFailure(error.response.data.message || error.message));
   }
}

function* getUserLikedPosts({ payload }) {
   try {
      const response = yield instance({
         method: "get",
         url: `/auth/post/get/${payload.id}/liked_posts?page=${payload.page}`,
      })
      if (response.status === 200) {
         yield put(getUserLikedPostsSuccess(response.data.data));
      } else {
         yield put(getUserLikedPostsFailure(response.data.message));
      }
   } catch (error) {
      yield put(getUserLikedPostsFailure(error.response.data.message || error.message));
   }
}

function* editPost({ payload }) {
   try {
      const response = yield instance({
         method: "put",
         url: `/auth/post/edit/${payload.id}`,
         data: payload.data
      })
      if (response.status === 200) {
         yield put(editPostsSuccess(response.data.data));
      } else {
         yield put(editPostsFailure(response.data.message));
      }
   } catch (error) {
      yield put(editPostsFailure(error.response.data.message || error.message));
   }
}

function* deletePost({ payload }) {
   try {
      const response = yield instance({
         method: "delete",
         url: `/auth/post/delete/${payload}`,
      })
      if (response.status === 200) {
         yield put(deletePostsSuccess(response.data.data));
      } else {
         yield put(deletePostsFailure(response.data.message));
      }
   } catch (error) {
      yield put(deletePostsFailure(error.response.data.message || error.message));
   }
}

export default function* postSaga() {
   yield takeLatest(getPostsRequest, getPosts);
   yield takeLatest(addPostsRequest, addPost);
   yield takeLatest(uploadPostImageRequest, uploadPostImage);
   yield takeLatest(likePostsRequest, likePost);
   yield takeLatest(getPostByIdRequest, getPostById);
   yield takeLatest(getUserPostsRequest, getUserPosts);
   yield takeLatest(getUserLikedPostsRequest, getUserLikedPosts);
   yield takeLatest(editPostsRequest, editPost);
   yield takeLatest(deletePostsRequest, deletePost);
}
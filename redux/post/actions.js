import { createAction } from "redux-actions";


export const getPostsRequest = createAction("GET_POSTS_REQUEST")
export const getPostsSuccess = createAction("GET_POSTS_SUCCESS")
export const getPostsFailure = createAction("GET_POSTS_FAILURE")

export const addPostsRequest = createAction("ADD_POSTS_REQUEST")
export const addPostsSuccess = createAction("ADD_POSTS_SUCCESS")
export const addPostsFailure = createAction("ADD_POSTS_FAILURE")


export const uploadPostImageRequest = createAction("UPLOAD_POST_IMAGE_REQUEST")
export const uploadPostImageSuccess = createAction("UPLOAD_POST_IMAGE_SUCCESS")
export const uploadPostImageFailure = createAction("UPLOAD_POST_IMAGE_FAILURE")

export const likePostsRequest = createAction("LIKE_POSTS_REQUEST")
export const likePostsSuccess = createAction("LIKE_POSTS_SUCCESS")
export const likePostsFailure = createAction("LIKE_POSTS_FAILURE")

export const getPostByIdRequest = createAction("GET_POST_BY_ID_REQUEST")
export const getPostByIdSuccess = createAction("GET_POST_BY_ID_SUCCESS")
export const getPostByIdFailure = createAction("GET_POST_BY_ID_FAILURE")
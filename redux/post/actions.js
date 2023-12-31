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

export const getUserPostsRequest = createAction("GET_USER_POSTS_REQUEST")
export const getUserPostsSuccess = createAction("GET_USER_POSTS_SUCCESS")
export const getUserPostsFailure = createAction("GET_USER_POSTS_FAILURE")

export const getUserLikedPostsRequest = createAction("GET_USER_LIKED_POSTS_REQUEST")
export const getUserLikedPostsSuccess = createAction("GET_USER_LIKED_POSTS_SUCCESS")
export const getUserLikedPostsFailure = createAction("GET_USER_LIKED_POSTS_FAILURE")

export const editPostsRequest = createAction("EDIT_POSTS_REQUEST")
export const editPostsSuccess = createAction("EDIT_POSTS_SUCCESS")
export const editPostsFailure = createAction("EDIT_POSTS_FAILURE")

export const deletePostsRequest = createAction("DELETE_POSTS_REQUEST")
export const deletePostsSuccess = createAction("DELETE_POSTS_SUCCESS")
export const deletePostsFailure = createAction("DELETE_POSTS_FAILURE")

export const changePostCommentCount = createAction("CHANGE_COMMENT_COUNT")

export const changePost = createAction("CHANGE_POST")
import { createAction } from "redux-actions";


export const getPostsRequest = createAction("GET_POSTS_REQUEST")
export const getPostsSuccess = createAction("GET_POSTS_SUCCESS")
export const getPostsFailure = createAction("GET_POSTS_FAILURE")
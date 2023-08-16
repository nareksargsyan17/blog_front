import { createAction } from "redux-actions";


export const getCommentsRequest = createAction("GET_COMMENTS_REQUEST")
export const getCommentsSuccess = createAction("GET_COMMENTS_SUCCESS")
export const getCommentsFailure = createAction("GET_COMMENTS_FAILURE")


export const addCommentsRequest = createAction("ADD_COMMENTS_REQUEST")
export const addCommentsSuccess = createAction("ADD_COMMENTS_SUCCESS")
export const addCommentsFailure = createAction("ADD_COMMENTS_FAILURE")

export const changeCommentsList = createAction("CHANGE_COMMENTS_LIST")
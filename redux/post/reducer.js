import {handleActions} from "redux-actions";
import {
    getPostsRequest,
    getPostsSuccess,
    getPostsFailure,
    addPostsRequest,
    addPostsSuccess,
    addPostsFailure,
    uploadPostImageRequest,
    uploadPostImageSuccess,
    uploadPostImageFailure,
    likePostsRequest,
    likePostsSuccess,
    likePostsFailure,
    getPostByIdRequest,
    getPostByIdSuccess,
    getPostByIdFailure,
    changePost,
    changePostCommentCount
} from './actions'

const defaultState = {
    isGetPostsRequest: false,
    isGetPostsSuccess: false,
    isGetPostsFailure: false,
    isAddPostsRequest: false,
    isAddPostsSuccess: false,
    isAddPostsFailure: false,
    isUploadPostImageRequest: false,
    isUploadPostImageSuccess: false,
    isUploadPostImageFailure: false,
    isLikePostsRequest: false,
    isLikePostsSuccess: false,
    isLikePostsFailure: false,
    isGetPostByIdRequest: false,
    isGetPostByIdSuccess: false,
    isGetPostByIdFailure: false,
    postsData: [],
    successMessage: "",
    errorMessage: '',
    addedPost: {},
    post: {},
    commentCount: 0
}

const reducer = handleActions(
    {
        [changePost]: (
            state,
            {payload}
        ) => ({
            ...state,
            postsData: payload
        }),
        [changePostCommentCount]: (
            state,
            {payload}
        ) => ({
            ...state,
            commentCount: payload
        }),
        [getPostsRequest]: (
            state
        ) => ({
            ...state,
            isGetPostsRequest: true,
            isGetPostsSuccess: false,
            isGetPostsFailure: false,
        }),
        [getPostsSuccess]: (
            state,
            {payload},
        ) => ({
            ...state,
            isGetPostsRequest: false,
            isGetPostsSuccess: true,
            isGetPostsFailure: false,
            postsData: payload,
        }),
        [getPostsFailure]: (
            state,
            {payload}
        ) => ({
            ...state,
            isGetPostsRequest: false,
            isGetPostsSuccess: false,
            isGetPostsFailure: true,
            errorMessage: payload
        }),
        [addPostsRequest]: (
            state
        ) => ({
            ...state,
            isAddPostsRequest: true,
            isAddPostsSuccess: false,
            isAddPostsFailure: false,
        }),
        [addPostsSuccess]: (
            state,
            {payload},
        ) => ({
            ...state,
            isAddPostsRequest: false,
            isAddPostsSuccess: true,
            isAddPostsFailure: false,
            addedPost: payload,
            postsData: [...state.postsData, payload]
        }),
        [addPostsFailure]: (
            state,
            {payload}
        ) => ({
            ...state,
            isAddPostsRequest: false,
            isAddPostsSuccess: false,
            isAddPostsFailure: true,
            errorMessage: payload
        }),
        [uploadPostImageRequest]: (
            state
        ) => ({
            ...state,
            isUploadPostImageRequest: true,
            isUploadPostImageSuccess: false,
            isUploadPostImageFailure: false,
        }),
        [uploadPostImageSuccess]: (
            state,
            {payload},
        ) => ({
            ...state,
            isUploadPostImageRequest: false,
            isUploadPostImageSuccess: true,
            isUploadPostImageFailure: false,
            addedPost: {...state.addedPost, images: {path: payload}},
            postsData: [...state.postsData, {...state.addedPost, images: {path: payload}}]
        }),
        [uploadPostImageFailure]: (
            state,
            {payload}
        ) => ({
            ...state,
            isUploadPostImageRequest: false,
            isUploadPostImageSuccess: false,
            isUploadPostImageFailure: true,
            errorMessage: payload
        }),
        [likePostsRequest]: (
            state
        ) => ({
            ...state,
            isLikePostsRequest: true,
            isLikePostsSuccess: false,
            isLikePostsFailure: false,
        }),
        [likePostsSuccess]: (
            state,
            {payload},
        ) => ({
            ...state,
            isLikePostsRequest: false,
            isLikePostsSuccess: true,
            isLikePostsFailure: false,
            successMessage: payload,
        }),
        [likePostsFailure]: (
            state,
            {payload}
        ) => ({
            ...state,
            isLikePostsRequest: false,
            isLikePostsSuccess: false,
            isLikePostsFailure: true,
            errorMessage: payload
        }),
        [getPostByIdRequest]: (
            state
        ) => ({
            ...state,
            isGetPostByIdRequest: true,
            isGetPostByIdSuccess: false,
            isGetPostByIdFailure: false,
        }),
        [getPostByIdSuccess]: (
            state,
            {payload},
        ) => ({
            ...state,
            isGetPostByIdRequest: false,
            isGetPostByIdSuccess: true,
            isGetPostByIdFailure: false,
            post: payload,
            commentCount: payload?.postComments?.length
        }),
        [getPostByIdFailure]: (
            state,
            {payload}
        ) => ({
            ...state,
            isGetPostByIdRequest: false,
            isGetPostByIdSuccess: false,
            isGetPostByIdFailure: true,
            errorMessage: payload
        }),
    },
    defaultState
);

export default reducer
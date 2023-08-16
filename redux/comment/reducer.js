import {handleActions} from "redux-actions";
import {
    addCommentsFailure,
    addCommentsRequest, addCommentsSuccess, changeCommentsList,
    getCommentsFailure,
    getCommentsRequest,
    getCommentsSuccess,

} from './actions'

const defaultState = {
    isGetCommentsRequest: false,
    isGetCommentsSuccess: false,
    isGetCommentsFailure: false,
    isAddCommentsRequest: false,
    isAddCommentsSuccess: false,
    isAddCommentsFailure: false,
    comments: [],
    addedComment: {},
    errorMessage: '',
}

const reducer = handleActions(
    {
        [changeCommentsList]: (
            state,
            { payload }
        ) => ({
            ...state,
            comments: [...payload]
        }),
        [getCommentsRequest]: (
            state
        ) => ({
            ...state,
            isGetCommentsRequest: true,
            isGetCommentsSuccess: false,
            isGetCommentsFailure: false,
        }),
        [getCommentsSuccess]: (
            state,
            {payload},
        ) => ({
            ...state,
            isGetCommentsRequest: false,
            isGetCommentsSuccess: true,
            isGetCommentsFailure: false,
            comments: payload,
        }),
        [getCommentsFailure]: (
            state,
            {payload}
        ) => ({
            ...state,
            isGetCommentsRequest: false,
            isGetCommentsSuccess: false,
            isGetCommentsFailure: true,
            errorMessage: payload
        }),
        [addCommentsRequest]: (
            state
        ) => ({
            ...state,
            isAddCommentsRequest: true,
            isAddCommentsSuccess: false,
            isAddCommentsFailure: false,
        }),
        [addCommentsSuccess]: (
            state,
            {payload},
        ) => ({
            ...state,
            isAddCommentsRequest: false,
            isAddCommentsSuccess: true,
            isAddCommentsFailure: false,
            addedComment: payload,
        }),
        [addCommentsFailure]: (
            state,
            {payload}
        ) => ({
            ...state,
            isAddCommentsRequest: false,
            isAddCommentsSuccess: false,
            isAddCommentsFailure: true,
            errorMessage: payload
        }),
    },
    defaultState
);

export default reducer
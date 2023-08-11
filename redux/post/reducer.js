import {handleActions} from "redux-actions";
import {
  getPostsRequest,
  getPostsSuccess,
  getPostsFailure
} from './actions'

const defaultState = {
  isGetPostsRequest: false,
  isGetPostsSuccess: false,
  isGetPostsFailure: false,
  postsData: [],
  successMessage: "",
  errorMessage: '',
}

const reducer = handleActions(
  {
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
      { payload },
    ) => ({
      ...state,
      isGetPostsRequest: false,
      isGetPostsSuccess: true,
      isGetPostsFailure: false,
      postsData: payload,
    }),
    [getPostsFailure]: (
      state,
      { payload }
    ) => ({
      ...state,
      isGetPostsRequest: false,
      isGetPostsSuccess: false,
      isGetPostsFailure: true,
      errorMessage: payload
    }),
  },
  defaultState
);

export default reducer
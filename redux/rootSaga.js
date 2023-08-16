import {all} from "redux-saga/effects";
import postSaga from "./post/saga";
import authSaga from "./auth/saga";
import commentSaga from "./comment/saga";

export default function* rootSaga() {
    yield all([
        postSaga(),
        authSaga(),
        commentSaga(),
    ])
}
import {combineReducers} from "redux";


import posts from "./post/reducer";
import auth from "./auth/reducer";
import comments from "./comment/reducer";


const rootReducer = combineReducers(
    {
        posts,
        auth,
        comments
    }
)

export default rootReducer
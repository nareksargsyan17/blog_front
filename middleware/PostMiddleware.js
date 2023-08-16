'use client'

import {usePathname} from 'next/navigation'
import {useDispatch, useSelector} from "react-redux";
import {getPostByIdRequest} from "../redux/post/actions";
import {useEffect} from "react";
import {usePrevious} from "@react-hooks-library/core";
import {getUserRequest} from "../redux/auth/actions";

const PostMiddleWare = ({children}) => {
    const {
        isGetPostByIdSuccess,
        isGetPostByIdFailure,
        post
    } = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const prevGetSuccess = usePrevious(isGetPostByIdSuccess);
    const pathname = usePathname();

    useEffect(() => {
        dispatch(getPostByIdRequest(pathname));
    }, [dispatch, pathname])

    if (isGetPostByIdSuccess && prevGetSuccess === false) {
        return children
    } else if (post?.title) {
        return children
    } else if (isGetPostByIdFailure) {
        throw new Error("")
    }
};

export default PostMiddleWare;
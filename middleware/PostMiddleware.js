'use client'

import {usePathname} from 'next/navigation'
import {useDispatch, useSelector} from "react-redux";
import {getPostByIdRequest} from "../redux/post/actions";
import {useEffect} from "react";
import {usePrevious} from "@react-hooks-library/core";
import {getUserRequest} from "../redux/auth/actions";
import contentStyle from "../theme/contentStyle";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout";

const PostMiddleWare = ({children}) => {
    const {
        isGetPostByIdSuccess,
        isGetPostByIdFailure,
        post
    } = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const prevGetSuccess = usePrevious(isGetPostByIdSuccess);
    const pathname = usePathname();

    console.log(isGetPostByIdSuccess && prevGetSuccess)
    useEffect(() => {
        dispatch(getPostByIdRequest(pathname));
    }, [dispatch, pathname])

    if (post != null) {
        return children;
    } else if (isGetPostByIdFailure || post == null) {
        throw new Error("");
    } else {
        return (
           <Content style={contentStyle}>
               <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
           </Content>
        )
    }
};

export default PostMiddleWare;
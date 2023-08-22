"use client"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import contentStyle from "../theme/contentStyle";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {getUserLikedPostsRequest} from "../redux/post/actions";
import { useDispatch, useSelector } from "react-redux";

const UserLikedPostMiddleware = ({children}) => {
   const router = useRouter();
   const {
      isGetUserLikedPostsSuccess,
      isGetUserLikedPostsFailure
   } = useSelector(state => state.posts)
   const dispatch = useDispatch();
   const pathName = usePathname();
   const [token, setToken] = useState("");

   console.log(pathName.split("/"))

   useEffect(() => {
      dispatch(getUserLikedPostsRequest({
         id: pathName.split("/")[2],
         page: 1
      }))
   }, [dispatch, pathName])

   useEffect(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
         let token = localStorage.getItem("token");
         setToken(token);
      }
   }, [])

   if (token == null) {
      return router.replace("/signin");
   } else if (isGetUserLikedPostsFailure) {
      return router.back();
   } else if (token && isGetUserLikedPostsSuccess) {
      return children;
   } else {
      return (
         <Content style={contentStyle}>
            <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>
         </Content>
      )
   }
};

export default UserLikedPostMiddleware;
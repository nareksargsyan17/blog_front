"use client"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import contentStyle from "../theme/contentStyle";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getUserLikedPostsRequest } from "../redux/post/actions";
import { useDispatch, useSelector } from "react-redux";
import {getUserRequest} from "../redux/auth/actions";

const UserLikedPostMiddleware = ({children}) => {
   const router = useRouter();
   const {
      isGetUserSuccess,
      isGetUserFailure,
      user
   } = useSelector(state => state.auth)
   const dispatch = useDispatch();

   useEffect(() => {
      if (!user) {
         dispatch(getUserRequest())
      }
   }, [dispatch, user])

   if (isGetUserFailure) {
      return router.back();
   } else if (isGetUserSuccess || user) {
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